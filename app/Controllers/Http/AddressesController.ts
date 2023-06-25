import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'

export default class AddressesController {
  public async index({}: HttpContextContract) {
    const addresses = await Address.all()

    return addresses
  }

  public async store({ request }: HttpContextContract) {
    const { estado, cidade, bairro, logradouro, numero, complemento } = request.all()
    const address = await Address.create({
      estado,
      cidade,
      bairro,
      logradouro,
      numero,
      complemento,
    })

    return address
  }

  public async show({ request }: HttpContextContract) {
    const { id } = request.params()
    const address = await Address.findOrFail(id)

    return address
  }

  public async update({ request }: HttpContextContract) {
    const { id } = request.params()
    const body = request.all()

    const address = await Address.findOrFail(id)
    await address.merge(body).save()

    return address
  }

  public async destroy({ request }: HttpContextContract) {
    const { id } = request.params()
    const address = await Address.findOrFail(id)
    await address.delete()

    return {
      code: 200,
      message: 'Endereço deletado com sucesso!',
    }
  }
}
