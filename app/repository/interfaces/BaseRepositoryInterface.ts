import { inject } from "@adonisjs/core";

export default interface BaseRepositoryInterface {
   create(payload: Record<string, any>):  Promise<Record<string, any>>
 }