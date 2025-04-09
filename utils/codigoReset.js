function gerarCodigoSenha() {
    const codigo = Math.floor(Math.random() * 900000) + 100000;
    return codigo;
}

module.exports = {gerarCodigoSenha}