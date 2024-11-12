const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// Rutas
router.post('/crear', userController.crearUsuario)
router.post('/login', userController.obtenerUsuario);

module.exports = router
