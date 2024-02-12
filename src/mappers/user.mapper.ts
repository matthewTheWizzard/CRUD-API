import { UserDto } from "src/dto";
import { UserEntityModel } from "src/entities/user/model";
import { v4 as uuidv4 } from 'uuid';
export class UserMapper {
    static toEntity(dto: UserDto) {
        return {
            id: uuidv4(),
            username: dto.username,
            age: dto.age,
            hobbies: dto.hobbies,
        };
    }
    static toDto(entity: UserEntityModel) {
        return {
            username: entity.username,
            age: entity.age,
            hobbies: entity.hobbies,
        };
    }
}