const bcrypt = require('bcrypt');
const { pool } = require('../config/db');

exports.addWorker = async (req, res) => {
  const {
    tip_doc, trab_dni, trab_nombres, trab_apellidos, trab_email, trab_telefono1,
    trab_direccion, idRol, trab_sueldo, trab_comision, trab_sede, user, password,
    trab_fecha_nacimiento
  } = req.body;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Insert into trabajadores table
    const [workerResult] = await connection.query(
      `INSERT INTO trabajadores 
      (tip_doc, trab_dni, trab_nombres, trab_apellidos, trab_email, trab_telefono1, 
      trab_direccion, idRol, trab_estado, trab_sueldo, trab_comision, trab_sede, trab_fecha_nacimiento, trab_fecha_ingreso) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())`,
      [tip_doc, trab_dni, trab_nombres, trab_apellidos, trab_email, trab_telefono1,
        trab_direccion, idRol, 'activo', trab_sueldo, trab_comision, trab_sede, trab_fecha_nacimiento]
    );

    const workerId = workerResult.insertId;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert into usuario table
    await connection.query(
      `INSERT INTO usuario (user, password, rol_id, trab_id) 
      VALUES (?, ?, ?, ?)`,
      [user, hashedPassword, idRol, workerId]
    );

    await connection.commit();

    // Fetch the newly created worker
    const [newWorker] = await connection.query(`
      SELECT t.*, r.perfil as rol_nombre, u.user as usuario
      FROM trabajadores t
      LEFT JOIN rol r ON t.idRol = r.idRol
      LEFT JOIN usuario u ON t.trab_id = u.trab_id
      WHERE t.trab_id = ?
    `, [workerId]);

    res.status(201).json({ message: 'Worker added successfully', worker: newWorker[0] });
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

exports.updateWorker = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Prepare the fields to update in the trabajadores table
    const workerFields = { ...updateFields };
    delete workerFields.user;
    delete workerFields.password;

    if (Object.keys(workerFields).length > 0) {
      const updateQuery = `UPDATE trabajadores SET ? WHERE trab_id = ?`;
      await connection.query(updateQuery, [workerFields, id]);
    }

    // Update user if provided
    if (updateFields.user) {
      await connection.query(
        `UPDATE usuario SET user = ? WHERE trab_id = ?`,
        [updateFields.user, id]
      );
    }

    // Update password if provided
    if (updateFields.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(updateFields.password, saltRounds);
      await connection.query(
        `UPDATE usuario SET password = ? WHERE trab_id = ?`,
        [hashedPassword, id]
      );
    }

    await connection.commit();

    // Fetch the updated worker data
    const [updatedWorker] = await connection.query(`
      SELECT t.*, r.perfil as rol_nombre, u.user as usuario
      FROM trabajadores t
      LEFT JOIN rol r ON t.idRol = r.idRol
      LEFT JOIN usuario u ON t.trab_id = u.trab_id
      WHERE t.trab_id = ?
    `, [id]);

    res.json({ message: 'Worker updated successfully', worker: updatedWorker[0] });
  } catch (error) {
    await connection.rollback();
    console.error('Error updating worker:', error);
    res.status(500).json({ message: 'Error updating worker', error: error.message });
  } finally {
    connection.release();
  }
};

exports.deleteWorker = async (req, res) => {
  const { id } = req.params;

  try {
    // En lugar de eliminar, cambiar el estado a 'suspendido'
    const [result] = await pool.query(
      'UPDATE trabajadores SET trab_estado = ? WHERE trab_id = ?',
      ['suspendido', id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.json({ message: 'Worker suspended successfully' });
  } catch (error) {
    console.error('Error suspending worker:', error);
    res.status(500).json({ message: 'Error suspending worker', error: error.message });
  }
};