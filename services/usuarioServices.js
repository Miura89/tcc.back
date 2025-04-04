const cliente = require("../dbconnection");
const Usuario = require("../models/Usuarios");

async function createUser(usuario)
{
    console.log(usuario)
    if (!(usuario instanceof Usuario)) {
        throw new Error("Parâmetro deve ser uma instância de Usuario.");
    }

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
        const { row } = await cliente.query(query, values);
        return row[0];
    }catch(error){
        throw new Error(error.message);
    }
}

module.exports = createUser