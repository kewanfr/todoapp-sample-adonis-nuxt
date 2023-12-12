import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import StoreTaskValidator from 'App/Validators/Tasks/StoreTaskValidator'
import UpdateTaskValidator from 'App/Validators/Tasks/UpdateTaskValidator'


export default class TasksController  {

  // GET /tasks
  public async index ({auth, response}: HttpContextContract) {
    const user = auth.user!
    const tasks = await Task.query().where('user_id', user.id).orderBy('created_at', 'asc')
    return response.ok(tasks)
  }

  // POST /tasks
  public async store ({ auth, request, response }: HttpContextContract) {
    const user = auth.user!;

    const payload = await request.validate(StoreTaskValidator)
    payload.user_id = user.id;
    
    const task = await Task.create(payload)
    return response.created(task)
  }

  // GET /tasks/:id
  public async show ({ auth, response, params }: HttpContextContract) {
    // console.log(params)
    const user = auth.user!;
    const task = await Task.query().where('id', params.id).andWhere('user_id', user.id).firstOrFail();

    if (!task) {
      return response.notFound({error: 'Task not found'})
    }

    return response.ok(task)
  }

  // PUT /tasks/:id
  public async update ({ auth, request, response, params }: HttpContextContract) {
    const user = auth.user!;
    const task = await Task.query().where('id', params.id).andWhere('user_id', user.id).firstOrFail();

    if (!task) {
      return response.notFound({error: 'Task not found'})
    }

    const payload = await request.validate(UpdateTaskValidator);
    task.merge(payload).save()
    return response.ok(task)
  }

  // DELETE /tasks/:id
  public async destroy ({ auth, response, params }: HttpContextContract) {
    const user = auth.user!;
    const task = await Task.query().where('id', params.id).andWhere('user_id', user.id).firstOrFail();

    if (!task) {
      return response.notFound({error: 'Task not found'})
    }

    task.delete()
    return response.ok(task)
  }
}
