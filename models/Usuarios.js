class Usuario {
    constructor({nome, email, senha, cpf, telefone, cidade, genero, idade, sexualidade, etnia }) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
        this.telefone = telefone;
        this.cidade = cidade;
        this.genero = genero;
        this.idade = idade;
        this.sexualidade = sexualidade;
        this.etnia = etnia;
    }
}

module.exports = Usuario;