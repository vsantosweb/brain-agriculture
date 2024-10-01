// app/Exceptions/DoubleReportException.ts

import { Exception } from "@adonisjs/core/exceptions"


export default class DoubleReportException extends Exception {
  constructor() {
    super('Reading for the month has already been completed', {
      error_code: 'DOUBLE_REPORT',
      error_description: '"Leitura do mês já realizada'
    })
  }

  public get error() {
    return {
      error_code: this.code,
      error_description: this.message,
    }
  }
}
