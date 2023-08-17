import { Module } from '@nestjs/common';
import { SwitchController } from './switch.controller';
import { SwitchService } from './switch.service';
import {Switch, SwitchSchema} from "./schemas/switch.schema";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [ MongooseModule.forFeature([{ name: Switch.name, schema: SwitchSchema }])],
  controllers: [SwitchController],
  providers: [SwitchService]
})
export class SwitchModule {}
