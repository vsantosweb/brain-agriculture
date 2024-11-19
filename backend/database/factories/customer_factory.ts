import factory from '@adonisjs/lucid/factories'
import Customer from '#models/customer'

export const CustomerFactory = factory
  .define(Customer, async ({ faker }) => {
    return {
      name: faker.person.fullName(),
      document: faker.number.int().toString(),
      farm_name: faker.company.name(),
      city: faker.location.city(),
      state: faker.location.state(),
      farm_area: faker.number.float() *100,
      cultivable_area: faker.number.float() *100,
      vegetation_area: faker.number.float() *100,
    }
  })
  .build()