import Meter from "#models/meter"
import { dd } from "@adonisjs/core/services/dumper"

import MeterRepositoryInterface from "../../interfaces/MeterRepositoryInterface.js"
import { inject } from "@adonisjs/core";

export default class MeterLucidORMService implements MeterRepositoryInterface {

    create(payload: Record<string, any>): Promise<Record<string, any>> {
        
        dd(payload);
        return Meter.create(payload)

    }
}