const bcrypt = require('bcrypt');
const { pool } = require('../config/db');

exports.addWorker = async (req, res) => {
  const {
    dni, nombres, apellido_paterno, apellido_materno, email, celular,
    sede, rol, comision, usuario, contrasena, fecha_nacimiento, direccion
  } = req.body;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Insert into trabajadores table
    const [workerResult] = await connection.query(
      `INSERT INTO trabajadores 
      (trab_dni, trab_nombres, trab_apellidos, trab_mail, trab_telefono1, 
      trab_direccion, idRol, trab_estado, trab_comision, trab_sede, trab_fecha_nacimiento, trab_fecha_ingreso) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())`,
      [dni, nombres, `${apellido_paterno} ${apellido_materno}`, email, celular, 
      direccion, rol, 'activo', comision, sede, fecha_nacimiento]
    );

    const workerId = workerResult.insertId;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    // Insert into usuario table
    await connection.query(
      `INSERT INTO usuario (user, password, rol_id, trab_id) 
      VALUES (?, ?, ?, ?)`,
      [usuario, hashedPassword, rol, workerId]
    );

    await connection.commit();
    res.status(201).json({ message: 'Worker added successfully', workerId });
  } catch (error) {
    await connection.rollback();
    console.error('Error adding worker:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'Duplicate entry. DNI, email or username already exists.' });
    } else {
      res.status(500).json({ message: 'Error adding worker', error: error.message });
    }
  } finally {
    connection.release();
  }
};

exports.getWorkers = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT t.*, r.perfil as rol_nombre, u.user as usuario
      FROM trabajadores t
      LEFT JOIN rol r ON t.idRol = r.idRol
      LEFT JOIN usuario u ON t.trab_id = u.trab_id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching workers:', error);
    res.status(500).json({ message: 'Error fetching workers', error: error.message });
  }
};