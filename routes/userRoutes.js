const express = require('express');
const { createUsuarioController, enviarToken, alterarSenha, alterarDadosUsuario } = require('../controllers/usuarioController');
const { createAgenciaController, alterarDadosAgencia } = require('../controllers/agenciaController');
const { loginController } = require('../controllers/loginController');

const route = express.Router();

route.post("/usuarios", createUsuarioController);
route.post("/usuarios/enviar-email-redefinir", enviarToken);
route.patch("/usuarios/editar-senha", alterarSenha);
route.patch("/usuarios/editar-dados", alterarDadosUsuario);
route.post("/agencias", createAgenciaController);
route.patch("/agencias/editar-dados", alterarDadosAgencia)
route.post("/login", loginController);

module.exports = route;