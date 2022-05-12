import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDocument } from './schemas/schema';

@Controller('Clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  createClients(@Body() client: ClientDocument): Promise<ClientDocument> {
    return this.clientService.createClient(client);
  }

  @Put(':id')
  updateClients(
    @Param('id') id: string,
    @Body() client: ClientDocument,
  ): Promise<ClientDocument> {
    return this.clientService.updateClient(id, client);
  }

  @Delete(':id')
  deleteClient(@Param('id') id: string): Promise<any> {
    return this.clientService.deleteClient(id);
  }

  @Get(':id')
  getClient(@Param('id') id: string): Promise<ClientDocument> {
    return this.clientService.getClient(id);
  }

  @Get()
  getClients(): Promise<ClientDocument[]> {
    return this.clientService.getClients();
  }
}
