import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Verifica se o email já está cadastrado
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Se o email já estiver em uso, retorna o erro e interrompe a execução
      res.status(400).json({ error: 'Email já está em uso' });
      return; // Retorna explicitamente após enviar a resposta
    }

    // Cria o hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    // Retorna a resposta para o cliente
    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    // Retorna o erro de servidor
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Se as credenciais forem inválidas, retorna o erro e interrompe a execução
      res.status(401).json({ error: 'Credenciais inválidas' });
      return; // Retorna explicitamente após enviar a resposta
    }

    // Gera o token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    // Retorna o token gerado
    res.json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    // Retorna o erro de servidor
    console.error('Erro desconhecido:', error);
    res.status(500).json({ error: 'Erro ao fazer login'  });
  }

  
};
