import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Instructor } from './interface/instructor.interface';
import { InstructorService } from './instructor.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InstructorDocument } from './schemas/schema';

@Controller('instructors')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getInstructors(
    @Query('size') size?: string,
    @Query('page') page?: string,
    @Query('type') type?: string,
    @Query('fullname') fullname?: string,
  ): Promise<{ list: InstructorDocument[]; total: number }> {
    return {
      list: await this.instructorService.getInstructors(
        Number.parseInt(page) || 1,
        Number.parseInt(size) || 10,
        type,
        fullname,
      ),
      total: await this.instructorService.countInstructors(type, fullname),
    };
  }

  @Post()
  createInstructor(
    @Body() instructor: Instructor,
  ): Promise<InstructorDocument> {
    return this.instructorService.createInstructor(instructor);
  }
  @Put(':id')
  updateInstructor(
    @Body() instructor: InstructorDocument,
    @Param('id') id: string,
  ): Promise<any> {
    return this.instructorService.updateInstructor(id, instructor);
  }
  @Delete(':id')
  deleteInstructor(@Param('id') id: string): Promise<any> {
    return this.instructorService.deleteInstructor(id);
  }
}
