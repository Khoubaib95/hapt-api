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
import { Lead } from './interface/lead.interface';
import { LeadService } from './lead.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LeadDocument } from './schemas/schema';

@Controller('leads')
export class LeadController {
  Service;
  constructor(private readonly leadService: LeadService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getLeads(
    @Query('size') size?: string,
    @Query('page') page?: string,
    @Query('type') type?: string,
    @Query('fullname') fullname?: string,
  ): Promise<{ list: LeadDocument[]; total: number }> {
    return {
      list: await this.leadService.getLeads(
        Number.parseInt(page) || 1,
        Number.parseInt(size) || 10,
        type,
        fullname,
      ),
      total: await this.leadService.countLeads(type, fullname),
    };
  }

  @Post()
  createLead(@Body() lead: Lead): Promise<LeadDocument> {
    return this.leadService.createLead(lead);
  }
  @Put(':id')
  updateLead(
    @Body() lead: LeadDocument,
    @Param('id') id: string,
  ): Promise<any> {
    return this.leadService.updateLead(id, lead);
  }
  @Delete(':id')
  deleteLead(@Param('id') id: string): Promise<any> {
    return this.leadService.deleteLead(id);
  }
}
