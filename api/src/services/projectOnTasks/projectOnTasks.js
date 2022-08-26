import { db } from 'src/lib/db'

export const projectOnTasks = () => {
  return db.projectOnTask.findMany()
}

export const projectOnTask = ({ id }) => {
  return db.projectOnTask.findUnique({
    where: { id },
  })
}

export const createProjectOnTask = ({ input }) => {
  return db.projectOnTask.create({
    data: input,
  })
}

export const updateProjectOnTask = ({ id, input }) => {
  return db.projectOnTask.update({
    data: input,
    where: { id },
  })
}

export const deleteProjectOnTask = ({ id }) => {
  return db.projectOnTask.delete({
    where: { id },
  })
}

export const ProjectOnTask = {
  project: (_obj, { root }) =>
    db.projectOnTask.findUnique({ where: { id: root.id } }).project(),
  task: (_obj, { root }) =>
    db.projectOnTask.findUnique({ where: { id: root.id } }).task(),
}
