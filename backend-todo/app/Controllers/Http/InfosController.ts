import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InfosController {

  public async index ({response}: HttpContextContract) {
    return response.ok({
      name: 'Todo APP API',
      version: '0.1.0',
      author: 'Kéwan Bernier (kewanfr)',
      license: 'MIT',
      node: process.version,
      ram: process.memoryUsage(),
      adonis: '5.0.11',
      typescript: '4.2.4',
      database: 'postgres',
      orm: 'lucid',
    })
  }


}
