/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
const CustomersController = () => import('#controllers/customers_controller')
const CustomerDashboardsController = () => import('#controllers/customer_dashboards_controller')

import router from '@adonisjs/core/services/router'

router.get('customers/summary', [CustomerDashboardsController, 'summary'])
router.get('customers/by-state', [CustomerDashboardsController, 'farmsByState'])
router.get('customers/by-crops', [CustomerDashboardsController, 'farmsByCrops'])
router.resource('customers', CustomersController).apiOnly()

router.get('/', async () => {
  return 'Server is running...'
})
