/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const MeasuresController = () => import('#controllers/measures_controller')
const CustomersController = () => import('#controllers/customers_controller')

router.get('/', () => 'Server is runnnig...');

router.group(() => {

    router.resource('measures', MeasuresController);
    router.resource('customers', CustomersController);
    router.get('customers/:uuid/measures', [CustomersController, 'measures']);

}).prefix('api')
