import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from './interface/client.interface';
import { Client as ClientSchema, ClientDocument } from './schemas/schema';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(ClientSchema.name) private clientModel: Model<ClientDocument>,
  ) {}

  async getClient(id: string): Promise<ClientDocument> {
    return this.clientModel.findById(id).exec();
  }

  async getClients(): Promise<ClientDocument[]> {
    return this.clientModel.find().exec();
  }

  async createClient(client: ClientDocument): Promise<ClientDocument> {
    const newclient = new this.clientModel(client);
    return newclient.save();
  }

  async deleteClient(id: string): Promise<any> {
    return this.clientModel.deleteOne({ _id: id }).exec();
  }

  async updateClient(id: string, client: ClientDocument): Promise<any> {
    return this.clientModel.updateOne({ _id: id }, client).exec();
  }
}
