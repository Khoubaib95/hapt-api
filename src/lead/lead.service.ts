import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead } from './interface/lead.interface';
import { Lead as LeadSchema, LeadDocument } from './schemas/schema';

@Injectable()
export class LeadService {
  constructor(
    @InjectModel(LeadSchema.name) private leadModel: Model<LeadDocument>,
  ) {}

  async getLeads(
    page: number,
    size: number,
    type?: string,
    fullname?: string,
  ): Promise<LeadDocument[]> {
    const query = {
      fullname: fullname ? { $regex: fullname, $options: 'i' } : undefined,
      type: type ? Number.parseInt(type) : undefined,
    };
    if (!fullname) delete query.fullname;
    if (!type) delete query.type;
    return this.leadModel
      .find(query)
      .skip((page - 1) * size)
      .limit(size)
      .exec();
  }

  async countLeads(type?: string, fullname?: string): Promise<number> {
    const query = {
      fullname: fullname ? { $regex: fullname, $options: 'i' } : undefined,
      type: type ? Number.parseInt(type) : undefined,
    };
    if (!fullname) delete query.fullname;
    if (!type) delete query.type;
    return this.leadModel.find(query).count().exec();
  }

  async createLead(lead: Lead): Promise<LeadDocument> {
    const newLead = new this.leadModel(lead);
    return newLead.save();
  }

  async updateLead(id: string, lead: LeadDocument): Promise<any> {
    return this.leadModel.updateOne({ _id: id }, lead).exec();
  }

  async deleteLead(id: string): Promise<any> {
    return this.leadModel.deleteOne({ _id: id }).exec();
  }
}
