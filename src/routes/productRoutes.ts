import { Router } from 'express';
import { createProduct, getAllProducts, deleteProduct, updateProduct } from '../controllers/productController';

const router = Router();

// Rota para criar um novo produto
router.post('/', createProduct);

// Rota para listar todos os produtos
router.get('/', getAllProducts);

// Rota para atualizar um produto pelo ID
router.put('/:id', updateProduct);

// Rota para deletar um produto pelo ID
router.delete('/:id', deleteProduct);

export default router;
