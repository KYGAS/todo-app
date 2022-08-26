import { db } from 'src/lib/db'

export const taskOnMessages = () => {
  return db.taskOnMessage.findMany()
}

export const taskOnMessage = ({ id }) => {
  return db.taskOnMessage.findUnique({
    where: { id },
  })
}

export const createTaskOnMessage = ({ input }) => {
  return db.taskOnMessage.create({
    data: input,
  })
}

export const updateTaskOnMessage = ({ id, input }) => {
  return db.taskOnMessage.update({
    data: input,
    where: { id },
  })
}

export const deleteTaskOnMessage = ({ id }) => {
  return db.taskOnMessage.delete({
    where: { id },
  })
}

export const TaskOnMessage = {
  task: (_obj, { root }) =>
    db.taskOnMessage.findUnique({ where: { id: root.id } }).task(),
  message: (_obj, { root }) =>
    db.taskOnMessage.findUnique({ where: { id: root.id } }).message(),
}
