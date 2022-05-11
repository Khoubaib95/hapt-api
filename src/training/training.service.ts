import { Injectable } from '@nestjs/common';

@Injectable()
export class TrainingService {
  create(createTrainingDto: any) {
    return 'This action adds a new training';
  }

  findAll() {
    return `This action returns all training`;
  }

  findOne(id: number) {
    return `This action returns a #${id} training`;
  }

  update(id: number, updateTrainingDto: any) {
    return `This action updates a #${id} training`;
  }

  remove(id: number) {
    return `This action removes a #${id} training`;
  }
}
