import { IncomingMessage, ServerResponse } from "http";
import { UserRepository } from "../../../src/repositories";

export class UserService {
    userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async getUsers(req: IncomingMessage, res: ServerResponse) {
        try {
            console.log('getUsers');
            const users = await this.userRepository.findAll();
            console.log({users});
            res.statusCode = 200;
            
            res.end(JSON.stringify(users));
        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error }));
        }
    }
    
    public async getUser(id: string, res: ServerResponse) {
        try {
            console.log('getUser');
            const user = await this.userRepository.findOne(id);
            console.log({user});

            if (!user) {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'User not found' }));
                return;
            }

            res.statusCode = 200;
            res.end(JSON.stringify(user));
        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error }));
        }
    }

    public async createUser(user: any, res: ServerResponse) {
        try {
            const result = await this.userRepository.create(user);
            res.statusCode = 200;
            res.end(JSON.stringify(result))
        } catch (error) {
            console.log({error})
            res.statusCode = 500;
            res.end(JSON.stringify({ error }));
        }
    }

    public async updateUser(id: string, user: any, res: ServerResponse) {
        const userExists = await this.userRepository.findOne(id);

        if (!userExists) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'User not found' }));
            return;
        }

        try {
            const result = await this.userRepository.update(id, user);
            res.statusCode = 200;
            res.end(JSON.stringify(result))
        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error }));
        }
    }

    public async deleteUser(id: string, res: ServerResponse) {
        const userExists = await this.userRepository.findOne(id);

        if (!userExists) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'User not found' }));
            return;
        }

        try {
            const result = await this.userRepository.delete(id);
            res.statusCode = 200;
            res.end(JSON.stringify(result))
        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error }));
        }
    }
}