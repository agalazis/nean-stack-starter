import * as http from 'http';
import * as express from 'express';
// import { SwaggerUI } from './SwaggerUI';
import { Database } from './database';

export class Server {

    public static normalizePort(port: string | number): number | string | boolean {
        const parsedPort: number = (typeof port === 'string') ? parseInt(port, 10) : port;
        if (isNaN(parsedPort)) { // named pipe
            return port;
        }
        if (parsedPort >= 0) { // port number
            return parsedPort;
        }
        return false;
    }

    constructor(public httpServer: http.Server) { }

    public use(app: express.Application): void {
        this.httpServer.on('listening', () => {
            this.onStartUp(app);
        });
        this.httpServer.on('error', (error) => {
            this.onError(error);
        });
        this.httpServer.on('close', (error) => {
            this.onClose();
        });
    }

    public onStartUp(app: express.Application): void {
        console.log(`Aloha, your app is ready on ${app.get('host') || 'localhost'}:${app.get('port')}`);
    }

    public onError(error: any): void {
        if (error.syscall !== 'listen') {
            throw error;
        }
        switch (error.code) {
            case 'EACCES':
                console.error(`The Server requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`Port is already in use or blocked by the os`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    public onClose() {
        Database.clearDriver();
    }
}
