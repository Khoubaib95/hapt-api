import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingDocument } from './schemas/schema';
import { Training } from './interface/training.interface';

@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Get(':id')
  getTraining(@Param('id') id: string): Promise<TrainingDocument> {
    return this.trainingService.getTraining(id);
  }

  @Get()
  async getTrainings(
    @Query('size') size?: string,
    @Query('page') page?: string,
    @Query('code') code?: string,
    @Query('name') name?: string,
  ): Promise<{ list: TrainingDocument[]; total: number }> {
    return {
      list: await this.trainingService.getTrainings(
        Number.parseInt(page) || 1,
        Number.parseInt(size) || 10,
        code,
        name,
      ),
      total: await this.trainingService.countTrainings(code, name),
    };
  }

  @Post()
  async createTraining(@Body() training: Training): Promise<TrainingDocument> {
    return this.trainingService.createTraining(training);
  }

  @Put(':id')
  async updateTraining(
    @Param('id') id: string,
    @Body() training: Training,
  ): Promise<any> {
    return this.trainingService.updateTraining(id, training);
  }

  @Delete(':id')
  async deleteTraining(@Param('id') id: string): Promise<any> {
    return this.trainingService.deleteTraining(id);
  }
}
