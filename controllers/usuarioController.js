const Usuario = require("../models/Usuarios");
const createUser = require("../services/usuarioServices");

async function createUsuarioController(req, res) {
    try {
        // Criando o objeto corretamente
        const usuario = new Usuario(req.body);
        // Chamando a função de inserção corretamente
        const usuarioCriado = await createUser(usuario);
        
        return res.status(201).json({
            message: "Usuário criado com sucesso",
            data: usuarioCriado
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao criar usuário",
            error: error.message
        });
    }
}

module.exports = {
    createUsuarioController
} 
