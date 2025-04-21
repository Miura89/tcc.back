const {Agencia, AgenciaDtoEditar} = require("../models/Agencias");
const agenciaService = require("../services/agenciaServices");

async function createAgenciaController(req, res) {
    try {
        // Criando o objeto corretamente
        const agencia = new Agencia(req.body);
        // Chamando a função de inserção corretamente
        const agenciaCriada = await agenciaService.createAgencia(agencia);
        
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

async function alterarDadosAgencia(req, res) {
    
    const agencia = new AgenciaDtoEditar(req.body)
    const resposta = await agenciaService.editarDados(agencia, 1) //Tem que botar para pegar o id da url

    if(resposta.flag)
    {
        return res.status(201).json({
            message: "Agência alterado com sucesso",
            flag: true
        });
    }
    else{
        return res.status(500).json({
            message: "Algo deu errado ao alterar os dados, tente novamente",
            flag: false
        })
    }
}

module.exports = {
    createAgenciaController,
    alterarDadosAgencia
} 
