import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.all()
    for (const user of users) {
      await user.load('address')
    }

    return users
  }

  public async store({ request }: HttpContextContract) {
    const { nome, email, password, cpf, celular, addressId } = request.all()
    const user = await User.create({
      nome,
      email,
      password,
      cpf,
      celular,
      addressId,
    })

    return user
  }

  public async show({ request }: HttpContextContract) {
    const { id } = request.params()
    const user = await User.findOrFail(id)
    await user.load('address')

    return user
  }

  public async update({ request }: HttpContextContract) {
    const { id } = request.params()
    const body = request.all()

    const user = await User.findOrFail(id)
    await user.merge(body).save()

    return user
  }

  public async destroy({ request }: HttpContextContract) {
    const { id } = request.params()
    const user = await User.findOrFail(id)
    await user.delete()

    return {
      code: 200,
      message: 'Usuário deletado com sucesso!',
    }
  }
}
