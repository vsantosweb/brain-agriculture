import { DateTime } from 'luxon'
import { BaseModel, column, hasManyThrough, manyToMany } from '@adonisjs/lucid/orm'
import Customer from './customer.js'
import { type ManyToMany } from '@adonisjs/lucid/types/relations'

export default class CropType extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Customer, {
    pivotTable: 'customers_crops'
  })
  declare public customers: ManyToMany<typeof Customer>
}