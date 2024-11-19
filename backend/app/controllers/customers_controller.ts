import CropType from '#models/crop_type'
import Customer from '#models/customer'
import type { HttpContext } from '@adonisjs/core/http'
export default class CustomersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {

    const customers = await Customer.query().preload('crops')

    return response.ok({ customers })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {

    const data = request.all()

    const newCustomer = new Customer();

    const isValidArea = newCustomer.checkCultivableArea({
      farm_area: data.farm_area,
      cultivable_area: data.cultivable_area,
      vegetation_area: data.vegetation_area
    })

    const customerExists = await Customer.query().where('document', data.document).first();

    if (customerExists) return response.badRequest({ error: 'Customer already existis' })

    if (!isValidArea) return response.badRequest({ error: 'Cultivable area is invalid' })

    newCustomer.name = data.name
    newCustomer.document = data.document
    newCustomer.farm_name = data.farm_name
    newCustomer.city = data.city
    newCustomer.state = data.state
    newCustomer.farm_area = data.farm_area
    newCustomer.cultivable_area = data.cultivable_area
    newCustomer.vegetation_area = data.vegetation_area

    await newCustomer.save()

    // Associando os crops
    const crops = await CropType.query().whereIn('id', request.input('crops'))

    await newCustomer.related('crops').sync(crops.map((crop) => crop.id))

    await newCustomer.load('crops', (query) => { query.select('id', 'name') });

    return response.created({ message: 'Customer created successfully', customer: newCustomer })

  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {

    const customer = await Customer.find(params.id)

    if (!customer) {
      return response.notFound({ error: 'Customer not found' })
    }

    await customer.load('crops', (query) => {
      query.select('id', 'name')
    })

    return response.ok({ customer })

  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const data = request.all()

    // Encontrar o cliente
    const customer = await Customer.find(params.id)

    if (!customer) {
      return response.notFound({ error: 'Customer not found' })
    }

    const isValidArea = customer.checkCultivableArea({
      farm_area: data.farm_area,
      cultivable_area: data.cultivable_area,
      vegetation_area: data.vegetation_area
    })

    if (!isValidArea) {
      return response.badRequest({ error: 'Cultivable area is invalid' })
    }

    const customerExists = await Customer.query()
      .where('document', data.document)
      .whereNot('id', customer.id)
      .first()

    if (customerExists) {
      return response.badRequest({ error: 'Customer with this document already exists' })
    }

    customer.name = data.name
    customer.document = data.document
    customer.farm_name = data.farm_name
    customer.city = data.city
    customer.state = data.state
    customer.farm_area = data.farm_area
    customer.cultivable_area = data.cultivable_area
    customer.vegetation_area = data.vegetation_area

    await customer.save()

    const crops = await CropType.query().whereIn('id', request.input('crops'))
    await customer.related('crops').sync(crops.map((crop) => crop.id))

    await customer.load('crops', (query) => {
      query.select('id', 'name')
    })

    return response.ok({ message: 'Customer updated successfully', customer })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {

    const customer = await Customer.find(params.id)

    if (!customer) {
      return response.notFound({ error: 'Customer not found' })
    }

    await customer.related('crops').detach()

    await customer.delete()

    return response.ok({ message: 'Customer deleted successfully' })
  }
}