const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);

app.get('/api/test-connection', async (req, res) => {
  const isConnected = await testConnection();
  if (isConnected) {
    res.json({ message: 'Conexión a la base de datos establecida con éxito' });
  } else {
    res.status(500).json({ message: 'Error al conectar a la base de datos' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});