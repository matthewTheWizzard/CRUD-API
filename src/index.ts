import { App } from './app';
import dotenv from 'dotenv';
dotenv.config();

const PORT = Number(process.env.DEV_PORT) || 3000;
const app = new App();

app.start(PORT);