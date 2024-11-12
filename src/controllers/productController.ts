import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Adicionar um novo produto
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, description, price, userId, stock } = req.body;

  if (stock == null) {
    res.status(400).json({ error: 'O campo stock é obrigatório.' });
    return;
  }

  try {
    // Cria o novo produto
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        userId, // Usando o userId para associar o produto ao usuário
      },
    });

    res.status(201).json({
      message: 'Produto criado com sucesso',
      product,
    });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

// Listar todos os produtos
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
};

// Atualizar um produto existente
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
  
    try {
      // Verifica se o produto existe
      const product = await prisma.product.findUnique({
        where: { id: Number(id) },
      });
  
      if (!product) {
        res.status(404).json({ error: 'Produto não encontrado' });
        return;
      }
  
      // Atualiza o produto
      const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          name: name ?? product.name,
          description: description ?? product.description,
          price: price ?? product.price,
          stock: stock ?? product.stock,
        },
      });
  
      res.status(200).json({
        message: 'Produto atualizado com sucesso',
        updatedProduct,
      });
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  };

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
      // Verifica se o produto existe
      const product = await prisma.product.findUnique({
        where: { id: Number(id) },
      });
  
      if (!product) {
        res.status(404).json({ error: 'Produto não encontrado' });
        return;
      }
  
      // Deleta o produto
      await prisma.product.delete({
        where: { id: Number(id) },
      });
  
      res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      res.status(500).json({ error: 'Erro ao deletar produto' });
    }
  };