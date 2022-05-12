import { Session } from './interface/session.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Session as Sessionschema, SessionDocument } from './schemas/schema';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Sessionschema.name)
    private SessionModel: Model<SessionDocument>,
  ) {}

  getSession(id: string): Promise<SessionDocument> {
    return this.SessionModel.findById(id).exec();
  }

  async getSessions(
    page: number,
    size: number,

    session?: string,
  ): Promise<SessionDocument[]> {
    const query = {
      session: session ? { $regex: session, $options: 'i' } : undefined,
    };
    if (!session) delete query.session;

    return this.SessionModel.find(query)
      .skip((page - 1) * size)
      .limit(size)
      .populate(['training', 'instructor', 'students'])
      .exec();
  }

  async countSessions(session?: string): Promise<number> {
    const query = {
      session: session ? { $regex: session, $options: 'i' } : undefined,
    };
    if (!session) delete query.session;
    return this.SessionModel.find(query).count().exec();
  }

  async createSession(Session: Session): Promise<SessionDocument> {
    const newSession = new this.SessionModel(Session);
    return newSession.save();
  }

  async updateSession(id: string, Session: Session): Promise<any> {
    return this.SessionModel.updateOne({ _id: id }, Session).exec();
  }

  async deleteSession(id: string): Promise<any> {
    return this.SessionModel.deleteOne({ _id: id }).exec();
  }
}
