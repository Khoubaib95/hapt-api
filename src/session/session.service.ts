import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {
  create(createSessionDto: any) {
    return 'This action adds a new session';
  }

  findAll() {
    return `This action returns all session`;
  }

  findOne(id: number) {
    return `This action returns a #${id} session`;
  }

  update(id: number, updateSessionDto: any) {
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}