import http, { IncomingMessage, ServerResponse } from 'http';
import { AppModel } from './model';
import { Router } from '../../src/router';
import { METHODS, Routes } from '../../src/enums';
import { UserContoller } from '../../src/controller';

export class App implements AppModel{
    private server: http.Server;
    private router: Router;
    private userController: UserContoller;

    constructor() {
        this.userController = new UserContoller();
        this.server = http.createServer(this.handleRequest.bind(this));
        this.router = new Router();

        this.router.addRoute(METHODS.GET, Routes.USERS, this.userController.getAllUsers);
        this.router.addRoute(METHODS.GET, Routes.USER, this.userController.getUser);
        this.router.addRoute(METHODS.POST, Routes.USERS, this.userController.createUser);
        this.router.addRoute(METHODS.PUT, Routes.USER, this.userController.updateUser);
        this.router.addRoute(METHODS.DELETE, Routes.USER, this.userController.deleteUser);

        console.log({routes: this.router.routes})
    }

    private handleRequest(req: IncomingMessage, res: ServerResponse): void {
        res.setHeader('Content-Type', 'application/json');
        this.router.route(req, res);
    }

    start(port: number): void {
        this.server.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    }

}