import { db } from 'src/lib/db'
const postmark = require("postmark");
var client = new postmark.ServerClient('735360f3-82d0-4e10-8634-571baadcab6b');

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  User_Organisation: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).User_Organisation(),
}


export const emailUser = async ({ id }) => {
  const user = await db.user.findUnique({
    where: { id: parseInt(id) }
  });

  client.sendEmail({
    "From": 'aca@stuntcoders.com',
    "To": "aca@stuntcoders.com",
    "Subject": "Hello from Todo-App!",
    "HtmlBody": "<strong>Hello</strong> dear Todo-App user. You received a new message!",
    "TextBody": "Hello from Postmark!",
    "MessageStream": "outbound"
  });

  return user
}