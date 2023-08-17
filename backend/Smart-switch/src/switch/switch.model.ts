import {Prop} from "@nestjs/mongoose/dist/decorators/prop.decorator";
export class Switch {
    @Prop()
    device_id: string;

    @Prop()
    device_name: string;

    @Prop()
    device_ip: string;

    @Prop()
    ssid: string;

    @Prop()
    password: string;

    @Prop()
    state: boolean;
}


