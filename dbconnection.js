const { Client } = require("pg");

const cliente = new Client({
    host: 'shortline.proxy.rlwy.net', 
    port: 56491,
    user: 'postgres',
    password: 'mjNJTjvbSAUhGcvUjlfBuSvQVXoyaOvI',
    database: 'railway'
});

async function conectar() {
    try {
        await cliente.connect();
        console.log("✅ Conectado ao banco de dados!");
    } catch (error) {
        console.error("❌ Erro ao conectar no banco:", error.message);
    }
}

conectar();

module.exports = cliente;