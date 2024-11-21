// custom.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: number; // Agora, o TypeScript sabe que o 'userId' pode existir no objeto Request
    }
  }
}
