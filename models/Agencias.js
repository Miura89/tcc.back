class Agencia {
    constructor({nome,email,senha,cpf,cnpj}){
        this.nome = nome,
        this.email = email,
        this.senha = senha,
        this.cpf = cpf,
        this.cnpj = cnpj
    }
}

class AgenciaDtoEditar {
    constructor({nome,cnpj}){
        this.nome = nome,
        this.cnpj = cnpj
    }
}

module.exports = {Agencia, AgenciaDtoEditar}