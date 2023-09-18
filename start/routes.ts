import Route from '@ioc:Adonis/Core/Route'
Route.get('/', () => {
  return "Working!"
})

//login routes
Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout').middleware('auth')

//Users routes
Route.resource('users', 'UsersController')
  .apiOnly()
  .middleware({
    destroy: ['auth'],
    show: ['auth'],
    update: ['auth'],
    index: ['auth'],
    store: [],
  })

//Products routes
Route.get('products/search', 'ProductsController.search').middleware('auth')
Route.resource('products', 'ProductsController')
  .apiOnly()
  .middleware({
    destroy: ['auth'],
    show: ['auth'],
    update: ['auth'],
    index: ['auth'],
    store: ['auth'],
  })

//Addresses routes
Route.resource('addresses', 'AddressesController')
  .apiOnly()
  .middleware({
    destroy: ['auth'],
    show: ['auth'],
    update: ['auth'],
    index: ['auth'],
    store: [],
  })

//Categories routes
Route.resource('categories', 'CategoriesController')
  .apiOnly()
  .middleware({
    destroy: ['auth'],
    show: ['auth'],
    update: ['auth'],
    index: ['auth'],
    store: ['auth'],
  })

//Images routes
Route.resource('images', 'ImagesController')
  .apiOnly()
  .middleware({
    destroy: ['auth'],
    show: ['auth'],
    update: ['auth'],
    index: ['auth'],
    store: ['auth'],
  })
