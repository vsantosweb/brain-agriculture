import Customer from '#models/customer';
import Measure from '#models/measure';
import type { HttpContext } from '@adonisjs/core/http'

export default class CustomersController {

    async measures({ request, params }: HttpContext) {

        const customer = Customer.query()
            .where('uuid', params.uuid)
            .preload('measures')

        if (!request.all().measure_type) {
            const result =  await customer.first();

            if (result && result.measures.length <= 0) return {
                error_code: 'MEASURES_NOT_FOUND',
                error_description: 'Nenhum registro encontrado'
            }
            
            return result;
        }

        const upperCaseMeasureType = String(request.all().measure_type).toUpperCase();

        if (Measure.MEASURE_TYPE.includes(upperCaseMeasureType)) {
            const result = await customer.preload('measures', (query) => {
                query.where('measure_type', upperCaseMeasureType);
            }).first();

            if (result && result.measures.length <= 0) return {
                error_code: 'MEASURES_NOT_FOUND',
                error_description: 'Nenhum registro encontrado'
            }

            return result;

        } else {
            return {
                error_code: 'INVALID_TYPE',
                error_description: 'Tipo de medição não permitida'
            }
        }
    }
}