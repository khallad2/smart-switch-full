import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwitchModule } from './switch/switch.module';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {HeartbeatController} from "./heart-beat/heartbeat.controller";

@Module({
  imports: [
      SwitchModule,
      ConfigModule.forRoot({ envFilePath: '.env' , isGlobal: true} ),
      MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [AppController, HeartbeatController],
  providers: [AppService],
})
export class AppModule {}
