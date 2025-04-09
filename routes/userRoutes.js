const express = require('express')
const { createUsuarioController } = require('../controllers/usuarioController');
const { createAgenciaController } = require('../controllers/agenciaController')
const { loginController } = require('../controllers/loginController');



const route = express.Router()

route.post("/usuarios", createUsuarioController)
route.post("/agencia", createAgenciaController)
route.post("/login", loginController)

module.exports = route