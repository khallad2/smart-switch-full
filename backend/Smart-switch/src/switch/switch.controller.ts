import {Body, Controller, Get, Post} from '@nestjs/common';
import {SwitchService} from "./switch.service";
import {Switch} from "./schemas/switch.schema";

@Controller('switches')
export class SwitchController {
    constructor(private switchService: SwitchService) {}

    @Get("all")
    async findAll(): Promise<Switch[]> {
        return this.switchService.findAll();
    }

    @Post("new")
    async create(@Body() Switch): Promise<Switch> {
        return this.switchService.create(Switch);
    }
}
