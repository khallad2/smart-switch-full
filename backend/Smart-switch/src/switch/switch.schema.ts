import mongoose from "mongoose";
import { Document, Schema, Types } from 'mongoose';

export const SwitchSchema = new mongoose.Schema({
    device_id: {type: String, required: true},
    device_name: {type: String, required: true},
    device_ip: {type: String, required: true},
    ssid: {type: String, required: true},
    password: {type: String, required: true},
    state: {type: Boolean, required: true},
}, { timestamps: true, collection: 'smart-switch' });
