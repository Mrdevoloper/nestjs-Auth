import { Body, Controller, Post, Get, Query, Param, NotFoundException, UseGuards, Delete, Session, Patch } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorstor';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { AuthGuard } from './Guards/auth.guard';
import { User } from './users.entity';
import { UsersService } from './users.service';


@Controller()
@Serialize(UserDto)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) { }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User) {
        return user
    }

    @Post('/signup')
    async createuser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.name, body.password, body.email,)
        session.userId = user.id
        return user
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.name, body.password, body.email)
        session.userId = user.id
        return user
    }

    @Post('/signout')
    signOut(@Session() session: any) {
        return session.userId = null
    }


    @Get('')
    getAllUser(@Query('email') email: string) {
        const users = this.usersService.find(email)
        return users
    }


    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user;
    }


    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }

}
