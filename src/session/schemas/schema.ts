import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Training, TrainingDocument } from '../../training/schemas/schema';
import {
  Instructor,
  InstructorDocument,
} from '../../instructor/schemas/schema';
import { Client, ClientDocument } from '../../client/schemas/schema';

export type SessionDocument = Session & mongoose.Document;

@Schema({ timestamps: true })
export class Session {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Training.name,
    required: true,
  })
  training: TrainingDocument;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Instructor.name,
    required: true,
  })
  instructor: InstructorDocument;
  @Prop({ type: Date, required: true })
  startDate: Date;
  @Prop({ type: Date })
  endDate: Date;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Client.name }] })
  students: ClientDocument[];
}

export const Sessionschema = SchemaFactory.createForClass(Session);
