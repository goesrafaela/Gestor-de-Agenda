import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import * as authController from './controllers/authController';
import  userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

// Configuração do CORS para permitir a origem específica do Expo
app.use(cors({
  origin: 'http://192.168.11.100:19000', // Substitua pelo IP e porta do Expo DevTools
}));

app.use(express.json());

// Rotas de Autenticação
app.post('/register', authController.register);  
app.post('/login', authController.login);        

// Rotas de Produtos
app.use('/products', productRoutes);

//Retorna os usuários
app.use('/api', userRoutes);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
