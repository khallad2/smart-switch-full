import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
@Schema({   timestamps: true, collection: 'smart-switch'  })
export class Switch {
    @Prop()
    _id: string;

    @Prop()
    device_id: string;

    @Prop()
    device_ip: string;

    @Prop()
    ssid: string;

    @Prop()
    password: string;

    @Prop()
    status: boolean;
}

export const SwitchSchema = SchemaFactory.createForClass(Switch);
