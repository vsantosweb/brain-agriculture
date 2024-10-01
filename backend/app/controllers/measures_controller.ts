import Customer from '#models/customer';
import Measure from '#models/measure';
import measure from '#models/measure';
import type { HttpContext } from '@adonisjs/core/http'
import { v4 as uuidv4 } from 'uuid';
import ImageUploader from '../traits/ImageUploader.js';
import { createMeasureValidator } from '#validators/measure';
import GeminiService from '#services/gemini_service'
import { errors } from '@vinejs/vine';


export default class MeasuresController {

  protected geminiService: GeminiService

  constructor() {

    this.geminiService = new GeminiService();

  }
  async index({ }: HttpContext) {

    const measures = await measure.query().preload('customer')

    return {
      data: measures
    };

  }

  async store({ request }: HttpContext) {

    try {

      await createMeasureValidator.validate(request.all())

      const customer = await Customer.query().where('uuid', request.all().customer_code).first();

      if (!customer) return 'Customer not found';

      const checkCurrentMeasure = await Measure.findByMonthYearAndType(
        customer.id,
        request.input('measure_datetime'),
        request.input('measure_type')
      );

      if (checkCurrentMeasure) return {
        error_code: 'DOUBLE_REPORT',
        error_description: 'Já existe uma leitura para este tipo no mês atual.'
      }
      
      const imageUploader = new ImageUploader();

      const uploadedImage = await imageUploader
        .uploadImageBase64(request.input('image'), `customers/${customer.uuid}/measures`);

      this.geminiService.setImage(uploadedImage.absolutePath);

      const measureResult = (await this.geminiService.run()).trim();

      if (isNaN(measureResult)) return {
        error_code: 'INVALID_DATA',
        error_description: 'Não foi possível fazer a leitura da imagem, tente novamente'
      }

      const newMeasure = await Measure.create({
        customerId: customer.id,
        uuid: uuidv4(),
        measureDatetime: request.input('measure_datetime'),
        measureType: request.input('measure_type'),
        measure: (await this.geminiService.run()).trim(),
        measureImage: uploadedImage.relativePath
      })

      return { data: newMeasure };

    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return {
          error_code: 'INVALID_DATA',
          error_description: 'Os dados fornecidos no corpo da requisição são inválidos.'
        }
      }

      return error
    }

  }

  async update({ params, request }: HttpContext) {

    const measure = await Measure.findBy('uuid', params.id);

    if (isNaN(request.input('confirmed_value'))) return {
      error_code: 'INVALID_DATA',
      error_description: 'Os dados fornecidos no corpo da requisição são inválidos.'
    }

    if (!measure) return {
      error_code: 'MEASURE_NOT_FOUND',
      error_description: 'Leitura não encontrada'
    }

    if (measure.isConfirmed) return {
      error_code: 'CONFIRMATION_DUPLICATE',
      error_description: 'Leitura já confirmada'
    }

    measure.measure = request.input('confirmed_value');
    measure.isConfirmed = true;
    measure.save();

    return {
      success: true,
      data: measure
    };
  }

}