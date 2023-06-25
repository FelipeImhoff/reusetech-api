import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Image from 'App/Models/Image'
import { cuid } from '@ioc:Adonis/Core/Helpers'

export default class ImagesController {
  public async index({}: HttpContextContract) {
    const images = await Image.all()
    for (const image of images) {
      await image.load('product')
    }
    return images
  }

  public async store({ request, response }: HttpContextContract) {
    const imageFile = request.file('imagem')
    const { productId } = request.all()

    if (!imageFile) {
      return response.badRequest('Nenhum arquivo enviado')
    }

    const nome = `${cuid()}.${imageFile.extname}`

    await imageFile.move(Application.publicPath('uploads'), {
      name: nome,
      overwrite: true,
    })

    const image = await Image.create({ nome: nome, path: `/uploads/${nome}`, productId })

    return image
  }

  public async show({ params, response }: HttpContextContract) {
    const image = await Image.find(params.id)
    await image?.load('product')

    if (!image) {
      return response.notFound('Imagem não encontrada')
    }

    return response.download(Application.publicPath(`uploads/${image.nome}`))
  }

  public async update({ params, request, response }: HttpContextContract) {
    const image = await Image.find(params.id)

    if (!image) {
      return response.notFound('Imagem não encontrada')
    }

    const newImageFile = request.file('image')

    if (!newImageFile) {
      return response.badRequest('Arquivo não enviado')
    }

    const newnome = `${cuid()}.${newImageFile.extname}`

    await newImageFile.move(Application.publicPath('uploads'), {
      name: newnome,
      overwrite: true,
    })

    image.nome = newnome
    await image.save()

    return image
  }

  public async destroy({ params, response }: HttpContextContract) {
    const image = await Image.find(params.id)

    if (!image) {
      return response.notFound('Imagem não encontrada')
    }

    await image.delete()

    return response.noContent()
  }
}
