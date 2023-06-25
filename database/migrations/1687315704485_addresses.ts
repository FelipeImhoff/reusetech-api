import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('estado', 25).notNullable()
      table.string('cidade').notNullable()
      table.string('bairro').notNullable()
      table.string('logradouro').notNullable()
      table.integer('numero').notNullable()
      table.string('complemento')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
