require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');


const JWT_SECRET = process.env.JWT_SECRET;

const app = express();

app.use(express.json());

app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});