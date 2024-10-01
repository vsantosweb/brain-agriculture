import { Exception } from '@adonisjs/core/exceptions'

export default class InvalidDataException extends Exception {
  constructor() {
    super('Os dados fornecidos no corpo da requisição são inválidos', {
      code: 'INVALID_DATA'
    })
  }

  public get error() {
    return {
      error_code: this.code,
      error_description: this.message,
    }
  }
}