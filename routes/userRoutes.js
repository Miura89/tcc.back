const express = require('express')
//const usuarioController  = require('../controllers/usuarioControllers')
const { createUsuarioController } = require('../controllers/usuarioController');
const { loginController } = require('../controllers/loginController');



const route = express.Router()

//route.post("/usuarios", usuarioController);
route.post("/usuarios", createUsuarioController)
route.post("/login", loginController)


module.exports = route