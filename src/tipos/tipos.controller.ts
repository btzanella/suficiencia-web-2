import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { TiposService } from './tipos.service';
import { text } from 'stream/consumers';
@Controller('tipos')
export class TiposController {
    constructor(
        private readonly tiposService: TiposService
    ){}

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
    create(@Body() dto: { nome: string}){
        return this.tiposService.create(dto);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: Partial<{nome: string}>,
    ) {
        return this.tiposService.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number){
        await this.tiposService.remove(id);
        return {sucess: {text: 'Tipo removido!'}};
    }
}
