import { Injectable } from '@nestjs/common';

@Injectable()
export class InstructorService {
  create(createInstructorDto: any) {
    return 'This action adds a new instructor';
  }

  findAll() {
    return `This action returns all instructor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} instructor`;
  }

  update(id: number, updateInstructorDto: any) {
    return `This action updates a #${id} instructor`;
  }

  remove(id: number) {
    return `This action removes a #${id} instructor`;
  }
}
