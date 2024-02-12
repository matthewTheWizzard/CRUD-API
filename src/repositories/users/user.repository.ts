import { UserDto } from "../../../src/dto";
import { DB } from "../../db";
import { UserEntityModel } from "src/entities/user/model";

export class UserRepository {
    public async create(user: UserEntityModel): Promise<UserEntityModel> {
        DB.set(user.id, user);
        return user;
    }

    public async findAll(): Promise<UserEntityModel[]> {
        return Array.from(DB.values());
    }

    public async findOne(id: UserEntityModel['id']): Promise<UserEntityModel | null>{
        return DB.get(id) ?? null;
    }

    public async update(id: UserEntityModel['id'], data: UserDto): Promise<UserEntityModel> {
        DB.set(id, data);
        return DB.get(id);
    }

    public async delete(id: UserEntityModel['id']) {
        DB.delete(id);
        return id;
    }
}