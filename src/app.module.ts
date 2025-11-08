import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonaModule } from './persona/persona.module';
import { CreditoModule } from './credito/credito.module';

@Module({
  imports: [PersonaModule, CreditoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
