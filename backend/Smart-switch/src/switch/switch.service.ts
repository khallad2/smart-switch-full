import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Switch} from "./schemas/switch.schema";
import mongoose from "mongoose";

@Injectable()
export class SwitchService {
    constructor( @InjectModel(Switch.name) private switchModel: mongoose.Model<Switch>) {}
    async create(switchData: any): Promise<Switch> {
        const createdSwitch = new this.switchModel(Switch);
        return createdSwitch.save();
    }

    async findAll(): Promise<Switch[]> {
        return this.switchModel.find();
    }
}
