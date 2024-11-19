import { CustomerFactory } from '#database/factories/customer_factory'
import CropType from '#models/crop_type'
import Customer from '#models/customer';
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import _ from 'lodash';

export default class extends BaseSeeder {
  async run() {

    await CustomerFactory.createMany(10)

    for (const customer of await Customer.all()) {

      const random = Math.floor(Math.random() * (1 - 5 + 1)) + 5;

      const crops = await CropType.query()
        .orderByRaw('RANDOM()')
        .limit(random);
        
      customer.related('crops').attach(crops.map(x => x.id))
    }
  }
}