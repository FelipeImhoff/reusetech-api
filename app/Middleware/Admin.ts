import { AuthenticationException } from '@adonisjs/auth/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  private async throwError(){
    
  }

  public async handle({auth}: HttpContextContract, next: () => Promise<void>) {
    const {is_admin} = await auth.use('api').authenticate()
    if(!is_admin) {
      throw new AuthenticationException(
        'Unauthorized access',
        'E_UNAUTHORIZED_ACCESS'
      )
    }
    
    await next()
  }
}
