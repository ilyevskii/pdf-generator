import {User} from "../entity/user.entity";
import AppDataSource from "../typeorm.config";
import {Repository, UpdateResult} from "typeorm";

export class UserController {

    private userRepository: Repository<User> = AppDataSource.getRepository(User);

    async findUser(query: object) : Promise<User | null> {
        try {
            return await this.userRepository.findOneBy(query);
        }
        catch(err: any) {
            console.log(err.toString());
            return null;
        }
    }

    async createNewUser(user_data: object) : Promise<User | null> {
        try {
            const user: User = this.userRepository.create(user_data);
            await this.userRepository.save(user);
            return user;
        }
        catch(err: any) {
            console.log(err.toString());
            return null;
        }

    }

    async updateUser(user_data: User) {
        try {
            await this.userRepository.update(user_data.id!, user_data);
        }
        catch(err: any) {
            console.log(err.toString());
        }
    }
}