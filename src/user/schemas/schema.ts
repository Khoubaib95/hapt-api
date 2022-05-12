import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, unique: true })
  username: string;
  @Prop({ type: String })
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
