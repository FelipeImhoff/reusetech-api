import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract): Promise<any> {
    const { email, senha } = request.all()

    try {
      return await auth.use('api').attempt(email, senha)
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }

  public async logout({ auth }: HttpContextContract): Promise<void> {
    await auth.use('api').logout()
  }
}
