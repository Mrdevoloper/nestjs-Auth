import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    create(name: string, password: string, email: string) {
        const user = this.repo.create({ name, password, email })

        return this.repo.save(user)
    }


    find(email: string) {
        return this.repo.find({ where: { email } });
    }

    findOne(id: number) {
        if (!id) {
            return null
        }
        return this.repo.findOneBy({ id });
    }


    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return this.repo.remove(user);
    }
}
