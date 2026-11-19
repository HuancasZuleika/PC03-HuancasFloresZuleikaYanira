const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/api/universidades', async (req, res) => {
  try {
    const respuesta = await axios.get('http://universities.hipolabs.com/search?country=Peru');
    res.json(respuesta.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar la API' });
  }
});

app.listen(3000, () => {
  console.log('Backend corriendo en el puerto 3000');
});