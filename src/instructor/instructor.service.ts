import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instructor } from './interface/instructor.interface';
import {
  Instructor as InstructorSchema,
  InstructorDocument,
} from './schemas/schema';

@Injectable()
export class InstructorService {
  constructor(
    @InjectModel(InstructorSchema.name)
    private instructorModel: Model<InstructorDocument>,
  ) {}

  async getInstructors(
    page: number,
    size: number,
    type?: string,
    fullname?: string,
  ): Promise<InstructorDocument[]> {
    const query = {
      fullname: fullname ? { $regex: fullname, $options: 'i' } : undefined,
      type: type ? Number.parseInt(type) : undefined,
    };
    if (!fullname) delete query.fullname;
    if (!type) delete query.type;
    return this.instructorModel
      .find(query)
      .skip((page - 1) * size)
      .limit(size)
      .exec();
  }

  async countInstructors(type?: string, fullname?: string): Promise<number> {
    const query = {
      fullname: fullname ? { $regex: fullname, $options: 'i' } : undefined,
      type: type ? Number.parseInt(type) : undefined,
    };
    if (!fullname) delete query.fullname;
    if (!type) delete query.type;
    return this.instructorModel.find(query).count().exec();
  }

  async createInstructor(instructor: Instructor): Promise<InstructorDocument> {
    const newInstructor = new this.instructorModel(instructor);
    return newInstructor.save();
  }

  async updateInstructor(
    id: string,
    instructor: InstructorDocument,
  ): Promise<any> {
    return this.instructorModel.updateOne({ _id: id }, instructor).exec();
  }

  async deleteInstructor(id: string): Promise<any> {
    return this.instructorModel.deleteOne({ _id: id }).exec();
  }
}
