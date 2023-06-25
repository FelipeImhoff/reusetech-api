import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract): Promise<any> {
    const { email, password } = request.all()

    try {
      return await auth.use('api').attempt(email, password)
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }

  public async logout({ auth }: HttpContextContract): Promise<void> {
    await auth.use('api').logout()
  }
}
