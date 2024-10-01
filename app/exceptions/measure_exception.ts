import { Exception } from '@adonisjs/core/exceptions'

export default class MeasureException extends Exception {
  static status = 500
}