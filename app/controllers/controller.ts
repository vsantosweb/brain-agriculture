// import type { HttpContext } from '@adonisjs/core/http'

export default class Controller {
    async json(data: Record<string, any> | string, message?: string, status?: 200) {

        return {
            data: data,
            message: message,
            status: status
        };

    }
}