import { Controller, Get, Query } from '@nestjs/common';

@Controller('heartbeat')
export class HeartbeatController {
    @Get()
    getHeartbeat(@Query('ip') ip: any): string {
        return `ESP32 IP Address: ${ip} - Heartbeat received at ${new Date().toLocaleString()}`;
    }
}
