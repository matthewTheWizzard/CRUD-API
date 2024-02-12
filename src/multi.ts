import cluster from 'cluster';
import { App } from './app';
import os from 'os';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();


if (cluster.isPrimary) {
    console.log(`Start master`);

    const numCPUs = os.availableParallelism();
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    const app = new App()
    app.start(Number(process.pid));

    console.log(`Worker ${process.pid} started`);
}