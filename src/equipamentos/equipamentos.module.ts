import { Module } from '@nestjs/common';
import { EquipamentosController } from './equipamentos.controller';
import { EquipamentosService } from './equipamentos.service';
import { Equipamento } from './entities/equipamento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Equipamento])],
  controllers: [EquipamentosController],
  providers: [EquipamentosService],
})
export class EquipamentosModule {}
