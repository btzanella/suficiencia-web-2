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
} from '@nestjs/common';
import { EquipamentosService } from './equipamentos.service';
import { UpdateEquipamentoDto } from './dto/update-equipamento.dto';
import { CreateEquipamentoDto } from './dto/create-equipamento.dto';

@Controller('equipamentos')
export class EquipamentosController {
  constructor(private readonly equipamentosService: EquipamentosService) {}

  @Get()
  async findAll() {
    const equipamentos = await this.equipamentosService.findAll();
    return { equipamentos }; // Gera um objeto novo
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.equipamentosService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) // Força o retorno status = 201
  create(@Body() dto: CreateEquipamentoDto) {
    return this.equipamentosService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEquipamentoDto,
  ) {
    return this.equipamentosService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.equipamentosService.remove(id);
    return { success: { text: 'Equipamento removido!' } };
  }
}
