const cliente = require("../dbconnection");
const Usuario = require("../models/Usuarios");
const bcrypt = require("bcryptjs")
const emailSender = require("../services/emailService")
const fs = require('fs');
const path = require('path');
const codigoService = require('../utils/codigoReset');

async function createUser(usuario)
{
    if (!(usuario instanceof Usuario)) {
        throw new Error("Parâmetro deve ser uma instância de Usuario.");
    }
    
    usuario.senha = await bcrypt.hash(usuario.senha, 10);

    const query = `
        INSERT INTO Usuario (nome, email, senha, cpf, telefone, cidade, genero, idade, sexualidade, etnia)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *;
    `;

    const values = [
        usuario.nome, usuario.email, usuario.senha, usuario.cpf,
        usuario.telefone, usuario.cidade, usuario.genero, usuario.idade,
        usuario.sexualidade, usuario.etnia
    ];

    try{
        const { rows } = await cliente.query(query, values);
        console.log("Salvou no banco:")
        console.log(rows[0])
        return rows[0];
    }catch(error){
        throw new Error(error.message);
    }
}

async function verificarRedefinir(emailTo) {
    const filePath = path.join(__dirname, '..', 'layouts', 'redefinirSenha.html');
    let html = fs.readFileSync(filePath, 'utf-8');

    const codigo = codigoService.gerarCodigoSenha();
    html = html.replace('{{CODIGO}}', codigo);

    const dataExpiracao = new Date(Date.now() + 15 * 60 * 1000);

    const result = await cliente.query("SELECT * FROM Usuario WHERE email = $1", [emailTo]);    
    console.log(process.env.MAILSENDER_TOKEN)

    if (!result.rows.length) {
        return { message: "Usuário não encontrado", flag: false };
    }
    
    const usuario = result.rows[0];
    console.log(usuario.id_usuario)
    await cliente.query(
        "UPDATE Usuario SET token_redefine = $1, data_expiracao = $2 WHERE id_usuario = $3",
        [codigo, dataExpiracao, usuario.id_usuario]
    );

    const response = await emailSender(emailTo, usuario.nome, "Redefinir senha", html);

    return { message: response, flag: true };
}

async function verificarToken(email, token)
{
    const horaAtual = new Date.now();
    const result = await cliente.query("SELECT * FROM Usuarios WHERE Email = $1 AND token_redefine = $2", [email, token]);

    if(!result.rows.length)
        return {message: "TOKEN NÃO ENCONTRADO", flag: false}
    
    if(result.data_expiracao > horaAtual)
        return {message: "TOKEN EXPIRADO", flag: false}

    return true;
}

async function editarSenha(novaSenha, confirmacaoSenha, token)
{
    const result = await cliente.query("SELECT * FROM Usuario WHERE token_redefine = $1", [token])
    if(!result.rows.length)
        return {message: "Algo deu errado, tente novamente mais tarde", flag: false}

    if(novaSenha != confirmacaoSenha)
        return {message: "Senhas não são iguais", flag: false}
    console.log(novaSenha)
    const senhaCriptografada = await bcrypt.hash(novaSenha, 10);
    const alterar = await cliente.query(
        "UPDATE Usuario SET senha = $1 WHERE token_redefine = $2",
        [senhaCriptografada, token]
    );

    if(!alterar.rows.length)
        return {message: "Algo deu errado, tente novamente mais tarde", flag: false}

    return {message: "Senha alterada com sucesso", flag: true}
}
module.exports = {createUser, verificarRedefinir, verificarToken, editarSenha}