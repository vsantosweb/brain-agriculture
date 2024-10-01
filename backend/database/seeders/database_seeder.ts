import Customer from '#models/customer';
import Measure from '#models/measure';
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid';
 
export default class extends BaseSeeder {
  async run() {

    // Criar clientes
    const customers = Array.from({ length: 10 }).map(() => ({
      name: faker.person.fullName(),
      uuid: uuidv4()
    }));

    const createdCustomers = await Customer.createMany(customers);
    
    // Criar medidores para os endereços
    const measures = createdCustomers.flatMap(customer => {
      return Array.from({ length: 1 }).map(() => ({
        customerId: customer.id,
        uuid: uuidv4(),
        measureType: faker.helpers.arrayElement(['WATER', 'GAS']),
        measure: faker.string.numeric(8),
        metadata: faker.lorem.paragraph(),
        measureImage: faker.image.url()
      }));

    });

    await Measure.createMany(measures);
  }
}