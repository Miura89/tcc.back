const {checkLoginUsuario, checkLoginAgencia} = require("../services/loginServices");

async function loginController(req, res) {
    console.log(req.body.email)
    const resultadoUsuario = await checkLoginUsuario(req.body.email, req.body.senha);
    if(resultadoUsuario.contaVerificada != true)
    {
        const resultadoAgencia = await checkLoginAgencia(req.email, req.senha);
        if(resultadoAgencia.contaVerificada != true)
        {
            return res.status(401).json({
                message: 'Email ou senha incorreta',
                flag: false
            })
        }
        else{
            return res.status(200).json({
                message: 'Autenticado com sucesso',
                token: resultadoUsuario.token,
                flag: true
            })
        }
    }
    else
    {
        return res.status(200).json({
            message: 'Autenticado com sucesso',
            token: resultadoUsuario.token,
            flag: true
        })
    }
                
}

module.exports = {
    loginController
}
