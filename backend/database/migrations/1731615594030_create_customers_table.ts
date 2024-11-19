import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('document').nullable()
      table.string('farm_name').nullable()
      table.string('city').nullable()
      table.string('state').nullable()
      table.float('farm_area').defaultTo(0)
      table.float('cultivable_area').defaultTo(0)
      table.float('vegetation_area').defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}