import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import adminRoutes from './routes/admin';
import chatRoutes from './routes/chat-routes';

startServer()

async function startServer() {
  const app = express();

  app.use(cors(
    {
      origin: 'http://localhost:5173',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // Allow cookies and authentication headers
      exposedHeaders: ['Authorization'], // Expose custom headers
    }
  ));
  
  app.use(json());

  app.use(adminRoutes)
  app.use(chatRoutes);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
  });

  app.listen(4000);
  console.log('SERVER RUNNIG at http://localhost:4000')
}