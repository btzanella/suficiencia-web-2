import { Module } from '@nestjs/common';
import { EquipamentosController } from './equipamentos.controller';
import { EquipamentosService } from './equipamentos.service';
import { Equipamento } from './entities/equipamento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposModule } from 'src/tipos/tipos.module';
@Module({
  imports: [TypeOrmModule.forFeature([Equipamento]), TiposModule],
  controllers: [EquipamentosController],
  providers: [EquipamentosService],
})
export class EquipamentosModule {}
