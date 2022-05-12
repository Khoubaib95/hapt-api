import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { SessionDocument } from './schemas/schema';
import { Session } from './interface/session.interface';
import { SessionService } from './session.service';

@Controller('Sessions')
export class SessionController {
  constructor(private readonly SessionService: SessionService) {}
  @Get(':id')
  getSession(@Param('id') id: string): Promise<SessionDocument> {
    return this.SessionService.getSession(id);
  }

  @Get()
  async getSessions(
    @Query('size') size?: string,
    @Query('page') page?: string,
    @Query('code') session?: string,
  ): Promise<{ list: SessionDocument[]; total: number }> {
    return {
      list: await this.SessionService.getSessions(
        Number.parseInt(page) || 1,
        Number.parseInt(size) || 10,
        session,
      ),
      total: await this.SessionService.countSessions(session),
    };
  }

  @Post()
  async createSession(@Body() Session: Session): Promise<SessionDocument> {
    return this.SessionService.createSession(Session);
  }

  @Put(':id')
  async updateSession(
    @Param('id') id: string,
    @Body() Session: Session,
  ): Promise<any> {
    return this.SessionService.updateSession(id, Session);
  }

  @Delete(':id')
  async deleteSession(@Param('id') id: string): Promise<any> {
    return this.SessionService.deleteSession(id);
  }
}
