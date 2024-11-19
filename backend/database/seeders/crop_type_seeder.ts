import CropType from '#models/crop_type';
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    for (const cropType of ['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açúcar']) {
      await CropType.firstOrCreate({ name: cropType });
    }
  }
}