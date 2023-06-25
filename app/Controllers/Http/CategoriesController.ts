import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index({}: HttpContextContract) {
    const categories = await Category.all()

    return categories
  }

  public async store({ request }: HttpContextContract) {
    const { nome } = request.all()
    const category = await Category.create({
      nome,
    })

    return category
  }

  public async show({ request }: HttpContextContract) {
    const { id } = request.params()
    const category = await Category.findOrFail(id)

    return category
  }

  public async update({ request }: HttpContextContract) {
    const { id } = request.params()
    const body = request.all()

    const category = await Category.findOrFail(id)
    await category.merge(body).save()

    return category
  }

  public async destroy({ request }: HttpContextContract) {
    const { id } = request.params()
    const category = await Category.findOrFail(id)
    await category.delete()

    return {
      code: 200,
      message: 'Categoria deletado com sucesso!',
    }
  }
}
