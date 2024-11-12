const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/usuario');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/api', userRoutes);

// Configuración para servir archivos estáticos desde `src/html`
app.use(express.static(path.join(__dirname, 'src', 'html')));

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/usuarios', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión a la base de datos exitosa');
    })
    .catch((error) => {
        console.log('Error de conexión a la base de datos:', error);
    });

// Iniciar el servidor
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
app.use('/assets', express.static(path.join(__dirname, 'src', 'assets')));
