import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TiposModule } from './tipos/tipos.module';
import { EquipamentosModule } from './equipamentos/equipamentos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TiposModule, EquipamentosModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
