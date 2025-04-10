const {checkLoginUsuario, checkLoginAgencia} = require("../services/loginServices");

async function loginController(req, res) {
    try {
        const { email, senha, tipo } = req.body;
        
        if(tipo == "usuario"){
            const resultado = await checkLoginUsuario(email, senha);

            console.log("\n"+resultado.message)
            console.log("\ntoken:\n"+resultado.token)
            console.log("\nConta verificada:"+resultado.contaVerificada)

            return res.status(200).json(resultado);
        }
        
        if(tipo == "agencia"){
            const resultado = await checkLoginAgencia(email, senha);

            console.log("\n"+resultado.message)
            console.log("\ntoken:\n"+resultado.token)
            console.log("\nConta verificada:"+resultado.contaVerificada)

            return res.status(200).json(resultado);
        }        
                
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}


module.exports = {
    loginController
}
