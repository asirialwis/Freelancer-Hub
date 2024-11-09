import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import dbConnect from './db-config';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  dbConnect();
});