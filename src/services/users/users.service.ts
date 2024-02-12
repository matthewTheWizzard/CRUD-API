import { UserRepository } from "../../../src/repositories";
import { UserMapper } from "../../mappers/user.mapper";
import { CustomResponse } from "../../../src/router/model";
import { UserEntityModel } from "src/entities/user/model";
import { UserDto } from "../../../src/dto";
import { StatusCodes } from "../../../src/enums";
import { validate as isUUID } from "uuid";

export class UserService {
    userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async getUsers(): Promise<CustomResponse<UserEntityModel[]>> {
        try {
            const users = await this.userRepository.findAll();

            const response = {
                data: users,
                statusCode: StatusCodes.OK,
                message: 'Success'
            }

            return response;
        } catch (error) {
            return {
                data: [],
                statusCode: StatusCodes.BAD_REQUEST,
                message: (error as Error).message
            }
        }
    }

    public async getUser(id: string): Promise<CustomResponse<UserEntityModel | null>> {
        try {
            if (!isUUID(id)) {
                throw new Error('Invalid UUID', { cause: StatusCodes.BAD_REQUEST});
            }

            const user = await this.userRepository.findOne(id);

            if (!user) {
                throw new Error('User not found', { cause: StatusCodes.NOT_FOUND});
            }

            return {
                data: user,
                statusCode: StatusCodes.OK,
                message: 'Success'
            }
        } catch (error) {
            return {
                data: null,
                statusCode: (error as Error).cause as StatusCodes || StatusCodes.BAD_REQUEST,
                message: (error as Error).message
            }
        }
    }

    public async createUser(user: UserDto): Promise<CustomResponse<UserEntityModel | null>> {
        try {
            const result = await this.userRepository.create(UserMapper.toEntity(user));

            if (!result) {
                throw new Error('username, age and hobbies are required fields');
            }

            return {
                data: result,
                statusCode: StatusCodes.CREATED,
                message: 'User created'
            }
        } catch (error) {
            return {
                data: null,
                statusCode: StatusCodes.BAD_REQUEST,
                message: (error as Error).message
            }
        }
    }

    public async updateUser(
        id: UserEntityModel['id'],
        user: UserDto
    ): Promise<CustomResponse<UserEntityModel | null>> {
        try {
            if (!isUUID(id)) {
                throw new Error('Invalid UUID', { cause: StatusCodes.BAD_REQUEST});
            }

            const userExists = await this.userRepository.findOne(id);
            if (!userExists) {
                throw new Error('User not found', { cause: StatusCodes.NOT_FOUND});
            }

            const result = await this.userRepository.update(id, user);

            return {
                data: result,
                statusCode: StatusCodes.OK,
                message: 'User updated'
            }
        } catch (error) {
            return {
                data: null,
                statusCode: (error as Error).cause as StatusCodes || StatusCodes.BAD_REQUEST,
                message: (error as Error).message
            }
        }
    }

    public async deleteUser(
        id: string
    ): Promise<CustomResponse<UserEntityModel['id'] | null>> {
        try {
            if (!isUUID(id)) {
                throw new Error('Invalid UUID');
            }

            const userExists = await this.userRepository.findOne(id);

            if (!userExists) {
                throw new Error('User not found', { cause: StatusCodes.NOT_FOUND});
            }

            const result = await this.userRepository.delete(id);

            return {
                data: result,
                statusCode: StatusCodes.OK,
                message: 'User deleted'
            }
        } catch (error) {
            return {
                data: null,
                statusCode: (error as Error).cause as StatusCodes || StatusCodes.BAD_REQUEST,
                message: (error as Error).message
            }
        }
    }
}