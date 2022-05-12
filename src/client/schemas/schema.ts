import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { GenderType, UidType } from '../interface/client.interface';

export type ClientDocument = Client & mongoose.Document;

@Schema({ timestamps: true })
export class Client {
  @Prop({ type: String, required: true })
  fullname: string;

  @Prop({ type: String, enum: ['m', 'f'] })
  gender: GenderType;

  @Prop({ type: Date })
  birthDate: Date;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  scolar: {
    level: number;
    diploma?: string;
  };

  @Prop({ type: String })
  note?: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  address: {
    street: string;
    city: string;
    zip: number;
  };

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  uid: {
    value: string;
    type: UidType;
  };
}

export const ClientSchema = SchemaFactory.createForClass(Client);
