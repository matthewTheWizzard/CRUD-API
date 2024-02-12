import { isArrayOfStrings, isNumber, isString, isRequired } from '../../validate';
import uuid from 'uuid'

export class UserEntity {
    id: string;
    username: string;
    age: number;
    hobbies: string[];

    constructor(id: string, username: string, age: number, hobbies: string[]) {
        this.validateFields();

        this.id = uuid.v4();
        this.username = username;
        this.age = age;
        this.hobbies = hobbies;
    }

    private validateFields(): boolean {
        const validUsername = isString(this.username) && isRequired(this.username);

        if (!validUsername) {
            throw new Error('Invalid username');
        }

        const validHobbies = isArrayOfStrings(this.hobbies) && isRequired(this.hobbies);

        if (!validHobbies) {
            throw new Error('Invalid hobbies');
        }

        const validAge = isNumber(this.age) && isRequired(this.age);

        if (!validAge) {
            throw new Error('Invalid age');
        }

        return true;
    }
}