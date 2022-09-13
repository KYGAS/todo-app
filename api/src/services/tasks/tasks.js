import { db } from 'src/lib/db'

export const tasks = () => {
  return db.task.findMany()
}

export const task = ({ id }) => {
  return db.task.findUnique({
    where: { id },
  })
}

export const createTask = ({ input, project_id }) => {

  return db.task.create({
    data: input,
  }).then( newTask=>{
    return db.projectOnTask.create({
      data: {
        project_id: project_id,
        task_id: newTask.id
      }
    }).then(_=>{
      return db.project.findFirst();
    })
  })


  return db.task.create({
    data: input,
  })
}

export const updateTask = ({ id, input }) => {
  return db.task.update({
    data: input,
    where: { id },
  })
}

export const deleteTask = ({ id }) => {
  return db.task.delete({
    where: { id },
  })
}

export const Task = {
  Project_Task: (_obj, { root }) =>
    db.task.findUnique({ where: { id: root.id } }).Project_Task(),
  Task_Message: (_obj, { root }) =>
    db.task.findUnique({ where: { id: root.id } }).Task_Message(),
}
