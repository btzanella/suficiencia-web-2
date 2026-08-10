import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TiposModule } from './tipos/tipos.module';
import { EquipamentosModule } from './equipamentos/equipamentos.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TiposModule,
    EquipamentosModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }), // Permite o Nest ler o .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres', // Tipo do banco
        host: config.get('DB_HOST'), // Host do banco
        port: Number(config.get('DB_PORT')), // Porta do banco
        username: config.get('DB_USERNAME'), // Nome do usuário
        password: config.get('DB_PASSWORD'), // Senha do usuário
        database: config.get('DB_DATABASE'), // Nome da conexão
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Faz o Nest buscar as entities automaticamente
        synchronize: true, // Cria a estrutura no banco (caso não exista)
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
