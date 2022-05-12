import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

import { ClientModule } from './client/client.module';
import { InstructorModule } from './instructor/instructor.module';
import { SessionModule } from './session/session.module';
import { TrainingModule } from './training/training.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LeadModule } from './lead/lead.module';

/*
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.LOCAL_DB),
    AuthModule,
    UserModule,
    ClientModule,
    InstructorModule,
    SessionModule,
    TrainingModule,
    LeadModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, AuthModule],
})
export class AppModule {}*/
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/hapt-db'),
    LeadModule,
    ClientModule,
    TrainingModule,
    AuthModule,
    UserModule,
    InstructorModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
