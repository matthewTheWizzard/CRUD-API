import { isArrayOfStrings, isNumber, isString, isRequired } from '../../validate';
import { UserEntityModel } from './model';

export class UserEntity implements UserEntityModel{
    id: string;
    username: string;
    age: number;
    hobbies: string[];

    constructor(id: string, username: string, age: number, hobbies: string[]) {
        this.validateFields(id, username, age, hobbies);

        this.id = id;
        this.username = username;
        this.age = age;
        this.hobbies = hobbies;
    }

    private validateFields(id: string, username: string, age: number, hobbies: string[]): boolean {
        const validUsername = isString(username) && isRequired(username);

        if (!validUsername) {
            throw new Error('Invalid username');
        }

        const validHobbies = isRequired(hobbies) && isArrayOfStrings(hobbies);

        if (!validHobbies) {
            throw new Error('Invalid hobbies');
        }

        const validAge = isRequired(age) && isNumber(age);

        if (!validAge) {
            throw new Error('Invalid age');
        }

        return true;
    }
}