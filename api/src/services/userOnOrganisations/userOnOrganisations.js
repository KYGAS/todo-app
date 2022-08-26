import { db } from 'src/lib/db'

export const userOnOrganisations = () => {
  return db.userOnOrganisation.findMany()
}

export const userOnOrganisation = ({ id }) => {
  return db.userOnOrganisation.findUnique({
    where: { id },
  })
}

export const createUserOnOrganisation = ({ input }) => {
  return db.userOnOrganisation.create({
    data: input,
  })
}

export const updateUserOnOrganisation = ({ id, input }) => {
  return db.userOnOrganisation.update({
    data: input,
    where: { id },
  })
}

export const deleteUserOnOrganisation = ({ id }) => {
  return db.userOnOrganisation.delete({
    where: { id },
  })
}

export const UserOnOrganisation = {
  user: (_obj, { root }) =>
    db.userOnOrganisation.findUnique({ where: { id: root.id } }).user(),
  organisation: (_obj, { root }) =>
    db.userOnOrganisation.findUnique({ where: { id: root.id } }).organisation(),
}
