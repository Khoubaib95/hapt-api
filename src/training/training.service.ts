import { Training } from './interface/training.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Training as TrainingSchema, TrainingDocument } from './schemas/schema';

@Injectable()
export class TrainingService {
  constructor(
    @InjectModel(TrainingSchema.name)
    private trainingModel: Model<TrainingDocument>,
  ) {}

  getTraining(id: string): Promise<TrainingDocument> {
    return this.trainingModel.findById(id).exec();
  }

  async getTrainings(
    page: number,
    size: number,
    code?: string,
    name?: string,
  ): Promise<TrainingDocument[]> {
    const query = {
      name: name ? { $regex: name, $options: 'i' } : undefined,
      code: code ? { $regex: code, $options: 'i' } : undefined,
    };
    if (!name) delete query.name;
    if (!code) delete query.code;
    return this.trainingModel
      .find(query)
      .skip((page - 1) * size)
      .limit(size)
      .exec();
  }

  async countTrainings(code?: string, name?: string): Promise<number> {
    const query = {
      name: name ? { $regex: name, $options: 'i' } : undefined,
      code: code ? { $regex: code, $options: 'i' } : undefined,
    };
    if (!name) delete query.name;
    if (!code) delete query.code;
    return this.trainingModel.find(query).count().exec();
  }

  async createTraining(training: Training): Promise<TrainingDocument> {
    const newTraining = new this.trainingModel(training);
    return newTraining.save();
  }

  async updateTraining(id: string, training: Training): Promise<any> {
    return this.trainingModel.updateOne({ _id: id }, training).exec();
  }

  async deleteTraining(id: string): Promise<any> {
    return this.trainingModel.deleteOne({ _id: id }).exec();
  }
}
