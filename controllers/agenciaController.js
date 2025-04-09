const Agencia = require("../models/Agencias");
const createAgencia = require("../services/agenciaServices");

async function createAgenciaController(req, res) {
    try {
        // Criando o objeto corretamente
        const agencia = new Agencia(req.body);
        // Chamando a função de inserção corretamente
        const agenciaCriada = await createAgencia(agencia);
        
        return res.status(201).json({
            message: "Agencia criada com sucesso",
            data: agenciaCriada
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao criar agência",
            error: error.message
        });
    }
}

module.exports = {
    createAgenciaController
} 
