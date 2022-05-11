import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { InstructorModule } from './instructor/instructor.module';
import { SessionModule } from './session/session.module';
import { TrainingModule } from './training/training.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LeadModule } from './lead/lead.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    ClientModule,
    InstructorModule,
    SessionModule,
    TrainingModule,
    LeadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
