import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    private readonly users = [
        {
            userId: 1,
            username: 'lijianting',
            password: 'ljt123',
        },
        {
            userId: 2,
            username: 'liyaping',
            password: 'lyp321',
        },
    ];

    async findOne(username: string) {
        return this.users.find(user => user.username === username);
    }
}
