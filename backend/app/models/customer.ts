import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import CropType from './crop_type.js'
import { type ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare document: string

  @column()
  declare farm_name: string | null

  @column()
  declare city: string | null

  @column()
  declare state: string | null

  @column()
  declare farm_area: number

  @column()
  declare cultivable_area: number | null

  @column()
  declare vegetation_area: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => CropType, {
    pivotTable: 'customers_crops',
  })
  declare public crops: ManyToMany<typeof CropType>

  checkCultivableArea(data: { farm_area: number, cultivable_area: number, vegetation_area: number }): boolean {
   
    const { farm_area, cultivable_area, vegetation_area } = data

    return (cultivable_area + vegetation_area) > farm_area;
  }

}