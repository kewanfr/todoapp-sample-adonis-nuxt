import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import LoginValidator from 'App/Validators/Auth/LoginValidator';
import StoreUserValidator from 'App/Validators/Auth/StoreUserValidator';
import UpdateUserValidator from 'App/Validators/Auth/UpdateUserValidator';

export default class AuthController {

  public async register({request, response} : HttpContextContract) {
    const payload = await request.validate(StoreUserValidator);

    if (await User.findBy('pseudo', payload.pseudo)) {
      return response.badRequest({error: 'User already exists'});
    }
    const user = await User.create(payload);

    return response.created(user);
  }

  public async login({auth, request, response}: HttpContextContract) {
    const {pseudo, password} = await request.validate(LoginValidator);

    const token = await auth.use('api').attempt(pseudo, password);
    const user = auth.user!;

    return response.ok({"token": token, ...user.serialize()});
  }

  public async me({auth, response} : HttpContextContract) {
    // user without password
    const user = auth.user!.serialize({fields: {omit: ['password']}});
    return response.ok({ user })
  }
  
  public async update({ auth, request, response } : HttpContextContract) {

    const payload = await request.validate(UpdateUserValidator)

    if (payload.pseudo && await User.findBy('pseudo', payload.pseudo) && auth.user!.pseudo !== payload.pseudo) {
      return response.badRequest({error: 'Pseudo already exists'})
    }
  
    const user = await auth.user!.merge(payload).save()
  
    return response.ok(user) // 200 OK
  }

  public async delete({ auth, response } : HttpContextContract) {
      
    if (!auth.user) {
      return response.badRequest({error: 'User not found'})
    }

    await auth.user!.delete()

    return response.noContent() // 204 No Content
  }

}
