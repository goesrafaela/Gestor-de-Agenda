import express from 'express';
import { getAllUsers } from '../controllers/authController'; // Ajuste o caminho conforme necessário

const router = express.Router();

// Rota para listar todos os usuários
router.get('/users', getAllUsers);

export default router;
