import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { GenderType, UidType } from '../../client/interface/client.interface';

export type InstructorDocument = Instructor & mongoose.Document;

@Schema({ timestamps: true })
export class Instructor {
  @Prop({ type: String, required: true })
  fullname: string;

  @Prop({ type: String, enum: ['m', 'f'] })
  gender: GenderType;

  @Prop({ type: Date })
  birthDate: Date;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  scolar: {
    level: number;
    diploma?: string;
  };

  @Prop({ type: mongoose.Schema.Types.Mixed })
  job?: {
    title?: string;
    place?: string;
    exp?: number;
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

export const InstructorSchema = SchemaFactory.createForClass(Instructor);
