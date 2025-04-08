const checkLogin = require("../services/loginServices");

async function loginController(req, res) {
    try {
        const { email, senha } = req.body;
        const resultado = await checkLogin(email, senha);
        
        console.log("\n"+resultado.message)
        console.log("\ntoken:\n"+resultado.token)
        console.log("\nConta verificada:"+resultado.contaVerificada)
        
        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}

module.exports = {
    loginController
}
