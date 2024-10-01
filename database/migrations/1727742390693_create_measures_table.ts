import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'measures'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid').unique()
      table.integer('customer_id').unsigned().references('id').inTable('customers').onDelete('CASCADE')
      table.enum('measure_type', ['WATER', 'GAS'])
      table.string('measure').nullable()
      table.string('measure_image').nullable()
      table.text('metadata').nullable()
      table.date('measure_datetime').nullable()
      table.boolean('is_confirmed').defaultTo(false).nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}