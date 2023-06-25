import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index({}: HttpContextContract) {
    const products = await Product.all()
    for (const product of products) {
      await product.load('category')
      await product.load('user')
      await product.user.load('address')
      await product.load('image')
    }
    return products
  }

  public async store({ request }: HttpContextContract) {
    const { titulo, descricao, marca, modelo, quantidade, userId, categoryId } = request.all()

    const product = await Product.create({
      titulo,
      descricao,
      marca,
      modelo,
      quantidade,
      userId,
      categoryId,
    })

    return product
  }

  public async show({ request }: HttpContextContract) {
    const { id } = request.params()
    const product = await Product.findOrFail(id)
    const teste = await Product.query().whereLike('descricao', '%cri%')
    console.log(teste)
    await product.load('category')
    await product.load('user')
    await product.user.load('address')
    await product.load('image')
    return product
  }

  public async update({ request }: HttpContextContract) {
    const { id } = request.params()
    const body = request.all()

    const product = await Product.findOrFail(id)
    await product.merge(body).save()

    return product
  }

  public async destroy({ request }: HttpContextContract) {
    const { id } = request.params()
    const product = await Product.findOrFail(id)
    await product.delete()

    return {
      code: 200,
      message: 'Produto deletado com sucesso!',
    }
  }
}
