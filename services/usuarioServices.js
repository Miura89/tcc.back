const cliente = require("../dbconnection");
const Usuario = require("../models/Usuarios");
const bcrypt = require("bcryptjs")

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

module.exports = createUser