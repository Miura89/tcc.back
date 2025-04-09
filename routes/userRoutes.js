const express = require('express')
//const usuarioController  = require('../controllers/usuarioControllers')
const  usuarioController  = require('../controllers/usuarioController');
const { loginController } = require('../controllers/loginController');



const route = express.Router()

//route.post("/usuarios", usuarioController);
route.post("/usuarios", usuarioController.createUsuarioController)
route.post("/usuarios/enviar-email-redefinir", usuarioController.enviarToken)
route.patch("/usuarios/editar-senha", usuarioController.alterarSenha)
route.post("/login", loginController)


module.exports = route