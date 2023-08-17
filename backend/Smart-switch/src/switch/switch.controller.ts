import {Body, Controller, Get, Post} from '@nestjs/common';
import {SwitchService} from "./switch.service";
import {Switch} from "./switch.model";
import {ToggleStateDto} from "./dto/toggle-state.dto";
import {NotFoundException} from "@nestjs/common/exceptions/not-found.exception";

@Controller('switches')
export class SwitchController {
    constructor(private readonly switchService: SwitchService) {}

    @Get("all")
    async findAll(): Promise<Switch[]> {
        return this.switchService.findAll();
    }

    @Post("new")
    async create(@Body() Switch): Promise<Switch> {
        return this.switchService.create(Switch);
    }

    // @Post("toggle")
    // async toggle(@Body("id") id: string): Promise<Switch> {
    //     return await this.switchService.toggle(id) ;
    // }

    @Post('toggle')
    async toggleState(@Body() toggleStateDto: ToggleStateDto): Promise<any> {
        const updatedSwitch = await this.switchService.toggleState(toggleStateDto.id);
        if (!updatedSwitch) {
            throw new NotFoundException('Switch not found');
        }
        return { message: 'State toggled successfully', updatedSwitch };
    }
}
