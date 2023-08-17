import { Module } from '@nestjs/common';
import { SwitchController } from './switch.controller';
import { SwitchService } from './switch.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Switch} from "./switch.model";
import {SwitchSchema} from "./switch.schema";
@Module({
  imports: [ MongooseModule.forFeature([{ name: Switch.name, schema: SwitchSchema }])],
  controllers: [SwitchController],
  providers: [SwitchService]
})
export class SwitchModule {}
