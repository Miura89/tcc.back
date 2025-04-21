const {Usuario, UsuarioDtoEditar} = require("../models/Usuarios");
const usuarioService = require("../services/usuarioServices");

async function createUsuarioController(req, res) {

    const usuario = new Usuario(req.body)
    const resposta = await usuarioService.createUser(usuario)

    if(resposta.flag == true)
    {
        return res.status(201).json({
            message: "Usuário criado com sucesso",
            flag: true
        });
    }
    else{
        return res.status(500).json({
            message: "Algo deu errado com o cadastro, tente novamente",
            flag: false
        })
    }
}

async function enviarToken(req, res)
{
    try{
        console.log(req.body.emailTo)
        await usuarioService.verificarRedefinir(req.body.emailTo);
        return res.status(200).json({
            message: "Email enviado",
            flag: true
        })
    }
    catch(error){
        return res.status(500).json({
            message: error.message,
            flag: false
        })
    }
}

async function alterarSenha(req, res)
{
    try{
        const verifica = await usuarioService.editarSenha(req.body.novaSenha, req.body.confirmacaoSenha, req.body.token)
        console.log(verifica.flag)
        if(verifica.flag == true)
        {
            return res.status(200).json({
                message: "Senha alterada com sucesso",
                flag: true
            })
        }
        else
        {
            return res.status(500).json({
                message: "Algo deu errado",
                flag: false
            })
        }
    }
    catch(error){
        return res.status(500).json({
            message: error.message,
            flag: false
        })
    }
}

async function alterarDadosUsuario(req, res) {
    
    const usuario = new UsuarioDtoEditar(req.body)
    const resposta = await usuarioService.editarDados(usuario, 2) //Tem que botar para pegar o id da url

    if(resposta.flag)
    {
        return res.status(201).json({
            message: "Usuário alterado com sucesso",
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
    createUsuarioController,
    enviarToken,
    alterarSenha,
    alterarDadosUsuario
} 
