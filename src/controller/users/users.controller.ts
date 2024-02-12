import { IncomingMessage, ServerResponse } from "http";
import { UserService } from "../../../src/services";

export class UserContoller {
    userService: UserService;

    constructor() {
        this.userService = new UserService();
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getUser = this.getUser.bind(this);
        this.createUser = this.createUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    public async getAllUsers(req: IncomingMessage, res: ServerResponse) {
        await this.userService.getUsers(req, res);
    }

    public async getUser(req: IncomingMessage, res: ServerResponse) {
        const id = req.url?.split('/')[3];

        if (!id) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'User id is required' }));
            return;
        }

        await this.userService.getUser(id, res);
    }

    public async createUser(req: IncomingMessage, res: ServerResponse) {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            console.log({body})
            try {
                const user = JSON.parse(body);

                await this.userService.createUser(user, res);
            } catch (error) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid JSON in the request body' }));
            }
        });
    }

    public async updateUser(req: IncomingMessage, res: ServerResponse) {
        const id = req.url?.split('/')[3];

        if (!id) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'User id is required' }));
            return;
        }

        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const user = JSON.parse(body);

                await this.userService.updateUser(id, user, res);
            } catch (error) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid JSON in the request body' }));
            }
        });
    }

    public async deleteUser(req: IncomingMessage, res: ServerResponse) {
        const id = req.url?.split('/')[3];

        if (!id) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'User id is required' }));
            return;
        }

        await this.userService.deleteUser(id, res);
    }
}