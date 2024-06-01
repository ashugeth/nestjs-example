import { Injectable } from '@nestjs/common';

@Injectable() // below class is managable by NestJS, and is injectable in other classes
export class UsersService {

    private users = [
        {
            id: 1,
            name: 'John Doe',
        },
        {
            id: 2,
            name: 'Alice Caeiro',
        },
        {
            id: 3,
            name: 'Kadambi Bangdo',
        },
        {
            id: 4,
            name: 'Toreya Totema',
        },
        {
            id: 5,
            name: 'Chinganu Sukeya',
        },
    ];

    findAll(limit?: number, offset?: number) {
        if (!offset) offset = 0;
        if (limit) {
            const res = this.users.slice(+offset, +offset + +limit);
            return res;
        }
        return this.users;
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id);
    }

    create(user: { id: number, name: string }) {
        const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id);
        const newUser = { id: usersByHighestId[0].id + 1, ...user };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updatedUser: { name?: string }) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updatedUser };
            }
            return user;
        });
        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);
        console.log(this.users);
        return removedUser;
    }

}
