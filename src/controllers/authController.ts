import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;

  try {
    // Verifica se o email já está cadastrado
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email, // Confirme que o valor de 'email' está correto
      },
    });

    if (existingUser) {
      res.status(400).json({ error: 'Email já está em uso' });
      return;
    }

    // Cria o hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

// Função para listar todos os usuários
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Consulta todos os usuários na tabela User
    const users = await prisma.user.findMany();

    // Retorna a lista de usuários
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: 'Credenciais inválidas' });
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};
