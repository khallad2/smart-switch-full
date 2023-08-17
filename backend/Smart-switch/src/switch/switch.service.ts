import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Switch} from "./switch.model";
import mongoose from "mongoose";
import {SwitchSchema} from "./switch.schema";
import {NotFoundException} from "@nestjs/common/exceptions/not-found.exception";

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

    // async toggle(id: string): Promise<Switch> {
    //     const switchData = await this.switchModel.findById(id);
    //     switchData.state = !switchData.state;
    //     return switchData.save();
    // }

    async toggleState(object_id: string): Promise<Switch> {
        const existingSwitch = await this.switchModel.findById(object_id);
        if (!existingSwitch) {
            throw new NotFoundException('Switch not found');
        }

        existingSwitch.state = !existingSwitch.state;
        return existingSwitch.save();
    }
}
