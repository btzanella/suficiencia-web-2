import { Module } from '@nestjs/common';
import { TiposController } from './tipos.controller';
import { TiposService } from './tipos.service';
import { Tipo } from './entities/tipo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tipo])],
  controllers: [TiposController],
  providers: [TiposService],
  exports: [TiposService]
})
export class TiposModule {}
