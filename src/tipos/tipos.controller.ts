import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TiposService } from './tipos.service';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { JwtAuthGuards } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('tipos')
@UseGuards(JwtAuthGuards)
@ApiBearerAuth('acess-token')
export class TiposController {
  constructor(private readonly tiposService: TiposService) {}

  @Get()
  findAll() {
    return this.tiposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tiposService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) // Força o retorno status = 201
  create(@Body() dto: CreateTipoDto) {
    return this.tiposService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTipoDto) {
    return this.tiposService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.tiposService.remove(id);
    return { sucess: { text: 'Tipo removido!' } };
  }
}
