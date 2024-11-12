import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import * as authController from './controllers/authController';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas de Autenticação
app.post('/register', authController.register);  // Aqui está correto
app.post('/login', authController.login);        // Aqui está correto

// Rotas de Produtos
app.use('/products', productRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
