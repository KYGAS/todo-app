import { db } from 'src/lib/db'

export const messages = () => {
  return db.message.findMany()
}

export const message = ({ id }) => {
  return db.message.findUnique({
    where: { id },
  })
}

export const createMessage = ({ input, task_id }) => {

  return db.message.create({
    data: input
  }).then( newMessage =>{
    return db.taskOnMessage.create({
      data: {
        task_id: task_id,
        message_id: newMessage.id
      }
    }).then(_=>{
      return db.message.findFirst();
    })
  })


  return db.message.create({
    data: input,
  })
}

export const updateMessage = ({ id, input }) => {
  return db.message.update({
    data: input,
    where: { id },
  })
}

export const deleteMessage = ({ id }) => {
  return db.message.delete({
    where: { id },
  })
}

export const Message = {
  Task_Message: (_obj, { root }) =>
    db.message.findUnique({ where: { id: root.id } }).Task_Message(),
}
