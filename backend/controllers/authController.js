const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

exports.login = async (req, res) => {
  const { user, password } = req.body;

  try {
    const [rows] = await pool.execute('SELECT * FROM user WHERE user = ?', [user]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const isValidPassword = await bcrypt.compare(password, rows[0].password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: rows[0].id_user }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: rows[0].id_user, user: rows[0].user } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};