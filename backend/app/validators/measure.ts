import vine from '@vinejs/vine'

/**
 * Validates the measure creation action
 */
export const createMeasureValidator = vine.compile(
  vine.object({
    customer_code: vine.string().trim(),
    measure_datetime: vine.date(),
    measure_type: vine.enum(['WATER', 'GAS']),
    image: vine.string(),
  })
)
