const cliente = require("../dbconnection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

async function checkLoginUsuario(email, senha) {
    const result = await cliente.query("SELECT * FROM Usuario WHERE email = $1", [email]);

    if (result.rows.length === 0) {
        return { message: "Email não cadastrado", token: "X" , contaVerificada: false}
    }

    const usuario = result.rows[0];

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
        return { message: "Senha incorreta", token: "X" , contaVerificada: false}
    }

    const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
    
    return { message: "Login bem-sucedido", token , contaVerificada: true};
}

async function checkLoginAgencia(email, senha) {
    const result = await cliente.query("SELECT * FROM Agencia WHERE email = $1", [email]);

    if (result.rows.length === 0) {
        return { message: "Email não cadastrado", token: "X" , contaVerificada: false}
    }

    const agencia = result.rows[0];

    const senhaCorreta = await bcrypt.compare(senha, agencia.senha);

    if (!senhaCorreta) {
        return { message: "Senha incorreta", token: "X" , contaVerificada: false}
    }

    const token = jwt.sign(
        { id: agencia.id, email: agencia.email },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
    
    return { message: "Login bem-sucedido", token , contaVerificada: true};
}

module.exports = {
    checkLoginUsuario,
    checkLoginAgencia
}
