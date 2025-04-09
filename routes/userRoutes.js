const express = require('express');
const { createUsuarioController, enviarToken, alterarSenha } = require('../controllers/usuarioController');
const { createAgenciaController } = require('../controllers/agenciaController');
const { loginController } = require('../controllers/loginController');

const route = express.Router();

route.post("/usuarios", createUsuarioController);
route.post("/usuarios/enviar-email-redefinir", enviarToken);
route.patch("/usuarios/editar-senha", alterarSenha);
route.post("/agencia", createAgenciaController);
route.post("/login", loginController);

module.exports = route;