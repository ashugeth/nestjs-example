import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // /users
export class UsersController {

    // const usersService = new UsersService();

    constructor (private readonly usersService: UsersService) { }

    // 👈 Decorator
    @Get() // GET /users || GET /users?limit=10&offset=0
    findAll(
        @Query('limit') limit?: number, 
        @Query('offset') offset?: number
    ) {
        return this.usersService.findAll(limit, offset);
    }

    @Get(':id') // GET /users/:id
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Post(':id') // POST /users/:id
    create(@Body() user: { id: number, name: string }) {
        return this.usersService.create(user);
    }

    // @Put(':id') // PUT /users/:id
    // replace() {
    //     return {};
    // }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id') id: string, @Body() userUpdate: { name?: string }) {
        return this.usersService.update(+id, userUpdate);
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id') id: string) {
        return this.usersService.delete(+id);
    }

}
