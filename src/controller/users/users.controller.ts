import { IncomingMessage, ServerResponse } from "http";
import { UserService } from "../../../src/services";
import { JsonReturn } from "../../../src/router/utils";
import { StatusCodes } from "../../../src/enums";
import { UserDto } from "../../../src/dto";

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

    public async getAllUsers(_: IncomingMessage, res: ServerResponse) {
        const result = await this.userService.getUsers();

        JsonReturn(res, result);
    }

    public async getUser(req: IncomingMessage, res: ServerResponse) {
        const id = req.url?.split('/')[3];

        if (!id) {
            JsonReturn(res, {
                data: null,
                statusCode: StatusCodes.BAD_REQUEST,
                message: 'User id is required'
            });
            return;
        }

        const result = await this.userService.getUser(id);
        JsonReturn(res, result);
    }

    public async createUser(req: IncomingMessage, res: ServerResponse) {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const user: UserDto = JSON.parse(body);
                const result = await this.userService.createUser(user);

                JsonReturn(res, result);
            } catch (error) {
                JsonReturn(res, {
                    data: null,
                    statusCode: StatusCodes.BAD_REQUEST,
                    message: 'Invalid JSON in the request body'
                });
            }
        });
    }

    public async updateUser(req: IncomingMessage, res: ServerResponse) {
        const id = req.url?.split('/')[3];

        if (!id) {
            JsonReturn(res, {
                data: null,
                statusCode: StatusCodes.BAD_REQUEST,
                message: 'User id is required'
            });
            return;
        }

        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const user: UserDto = JSON.parse(body);

                const result = await this.userService.updateUser(id, user);
                JsonReturn(res, result);
            } catch (error) {
                JsonReturn(res, {
                    data: null,
                    statusCode: StatusCodes.BAD_REQUEST,
                    message: 'Invalid JSON in the request body'
                });
            }
        });
    }

    public async deleteUser(req: IncomingMessage, res: ServerResponse) {
        const id = req.url?.split('/')[3];

        if (!id) {
            JsonReturn(res, {
                data: null,
                statusCode: StatusCodes.BAD_REQUEST,
                message: 'User id is required'
            })
            return;
        }

        const result = await this.userService.deleteUser(id);
        JsonReturn(res, result);
    }
}