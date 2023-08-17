import mongoose from "mongoose";
import { Document, Schema, Types } from 'mongoose';
export interface SwitchSchema extends Document {
    device_id: string;
    device_name: string;
    device_ip: string;
    ssid: string;
    password: string;
    state: boolean;
}
// export const SwitchSchema = new mongoose.Schema({
//     device_id: {type: String, required: true},
//     device_name: {type: String, required: true},
//     device_ip: {type: String, required: true},
//     ssid: {type: String, required: true},
//     password: {type: String, required: true},
//     state: {type: Boolean, required: true},
// }, { timestamps: true, collection: 'smart-switch' });
