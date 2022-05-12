import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TrainingDocument = Training & mongoose.Document;

@Schema({ timestamps: true })
export class Training {
  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: String })
  trainer: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number })
  duration: number;
}

export const TrainingSchema = SchemaFactory.createForClass(Training);
