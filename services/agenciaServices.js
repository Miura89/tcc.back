const cliente = require("../dbconnection");
const {Agencia, AgenciaDtoEditar} = require("../models/Agencias");
const bcrypt = require("bcryptjs")

async function createAgencia(agencia)
{
    if (!(agencia instanceof Agencia)) {
        throw new Error("Parâmetro deve ser uma instância de Agencia.");
    }
    agencia.senha = await bcrypt.hash(agencia.senha, 10);

    const query = `
        INSERT INTO Agencia (nome, email, senha, cpf, cnpj)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const values = [ 
        agencia.nome, agencia.email, agencia.senha, agencia.cpf, agencia.cnpj
    ]
        

    try{
        const { rows } = await cliente.query(query, values);
        console.log("Salvou no banco:")
        console.log(rows[0])
        return rows[0];
    }catch(error){
        throw new Error(error.message);
    }
}

async function editarDados(agencia, id){
    if (!(agencia instanceof AgenciaDtoEditar)) {
        throw new Error("Parâmetro deve ser uma instância de Agencia.");
    }

    const query = `UPDATE Agencia SET nome = $1, cnpj = $2 
                   WHERE id_agencia = $3`

    const values = [
        agencia.nome,agencia.cnpj, id
    ]
    
    const { rows } = await cliente.query(query, values);
    if(rows.length > 0)
    {
        return {
            message: 'Dados alterados',
            flag: true
        }
    }
    else
    {
        return {
            message: "Erro ao alterar dados",
            flag: false
        }
    }

}

module.exports = {
    createAgencia,
    editarDados
}