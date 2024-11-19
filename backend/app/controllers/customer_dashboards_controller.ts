import CropType from '#models/crop_type'
import Customer from '#models/customer'
import type { HttpContext } from '@adonisjs/core/http'
import _ from 'lodash'

export default class CustomerDashboardsController {

  /**
   * Display a list of resource
   */
  async summary({ response }: HttpContext) {

    const customers = await Customer.all()

    const totalFarmArea = customers.reduce((sum, customer) => sum + customer.farm_area, 0)

    const totalFarms = customers.length

    const summary = {
      totalFarmArea: totalFarmArea,
      totalFarms: totalFarms
    }

    return response.ok({ summary });
  }

  async farmsByState({ response }: HttpContext) {
    
    const customers = await Customer.all()

    return response.ok(_.groupBy(customers, 'state'))

  }

  async farmsByCrops({ response }: HttpContext) {
    
    const crops = await CropType.query().preload('customers', (query)=>{
      query.select('id','name')
    })
    
    return response.ok(crops)

  }
}