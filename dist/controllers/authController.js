"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Verifica se o email já está cadastrado
        const existingUser = yield prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            res.status(400).json({ error: 'Email já está em uso' });
            return; // Retorna explicitamente após enviar a resposta
        }
        // Cria o hash da senha
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Cria o novo usuário
        const user = yield prisma.user.create({
            data: { email, password: hashedPassword },
        });
        // Retorna a resposta para o cliente
        res.status(201).json({ message: 'Usuário criado com sucesso', user: { id: user.id, email: user.email } });
    }
    catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: { email },
        });
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            res.status(401).json({ error: 'Credenciais inválidas' });
            return; // Retorna explicitamente após enviar a resposta
        }
        // Gera o token JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Retorna o token gerado
        res.json({ token });
    }
    catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});
exports.login = login;
//# sourceMappingURL=authController.js.map