import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }
    async signup(name: string, password: string, email: string,) {
        const users = await this.usersService.find(email)
        if (users.length) {
            throw new BadRequestException('email in use')
        } else {
            // Hash the users password
            // Generate and salt
            const salt = randomBytes(8).toString('hex')
            // Hash the salt and password togather
            const hash = (await scrypt(password, salt, 32)) as Buffer
            // join the hashed result and password togather
            const result = salt + '.' + hash.toString('hex')
            // return user
            const userResult = await this.usersService.create(name, result, email)
            return userResult
        }

    }

    async signin(name: string, password: string, email: string) {
        const [user] = await this.usersService.find(email)
        if (!user) {
            throw new NotFoundException('user not found')
        }

        const [salt, storedHash] = user.password.split('.')
        const hash = (await scrypt(password, salt, 32)) as Buffer
        const hashHex = hash.toString('hex')

        if (storedHash !== hashHex) {
            throw new BadRequestException('bad password')
        } else if (name !== user.name) {
            throw new BadRequestException('bad name')
        }
        return user
    }
}
