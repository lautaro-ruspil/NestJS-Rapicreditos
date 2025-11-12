import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PersonaModule } from './persona/persona.module';
import { CreditoModule } from './credito/credito.module';
import { ContactoModule } from './contacto/contacto.module';
import { PagoModule } from './pago/pago.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PersonaModule,
    CreditoModule,
    ContactoModule,
    PagoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
