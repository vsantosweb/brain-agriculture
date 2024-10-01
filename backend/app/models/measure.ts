import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import moment from 'moment';
import Customer from './customer.js';

export default class Measure extends BaseModel {

  public static MEASURE_TYPE = ['WATER', 'GAS'];
  
  @column({ isPrimary: true })
  declare id: number
  
  @column()
  declare uuid: string

  @column()
  declare customerId: number

  @column()
  declare measureImage: string | null

  @column()
  declare measureType: string

  @column()
  declare measure: string 

  @column()
  declare metadata: string
  
  @column()
  declare isConfirmed: boolean

  @column()
  declare measureDatetime: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  public static async findByMonthYearAndType(customerId: number, measureDate: string, measureType: string){

    const year = moment(measureDate).format('YYYY');
    const month = moment(measureDate).format('MM');

    const data = await Measure.query()
    .where('customer_id', customerId)
    .where('measure_type', measureType)
    .whereRaw('EXTRACT(MONTH FROM measure_datetime) = ?', [month])
    .whereRaw('EXTRACT(YEAR FROM measure_datetime) = ?', [year])
    .first()

    return data;

  }
}