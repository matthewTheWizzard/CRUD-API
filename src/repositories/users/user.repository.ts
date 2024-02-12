import { DB } from "../../db";

export class UserRepository {
    public async create(user: any) {
        DB.set(user.id, user);
        return user;
    }

    public async findAll() {
        return Array.from(DB.values());
    }

    public async findOne(id: string) {
        return DB.get(id);
    }

    public async update(id: string, data: any) {
        DB.set(id, data);
        return data;
    }

    public async delete(id: string) {
        DB.delete(id);
        return id;
    }
}