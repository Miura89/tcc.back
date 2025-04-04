const express = require('express')
const usuarioController  = require('../controllers/usuarioControllers')

const route = express.Router();

route.post("/usuarios", usuarioController);

module.exports = route