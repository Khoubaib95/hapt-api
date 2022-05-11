import { Injectable } from '@nestjs/common';

@Injectable()
export class LeadService {
  create(createLeadDto: any) {
    return 'This action adds a new lead';
  }

  findAll() {
    return `This action returns all lead`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lead`;
  }

  update(id: number, updateLeadDto: any) {
    return `This action updates a #${id} lead`;
  }

  remove(id: number) {
    return `This action removes a #${id} lead`;
  }
}
