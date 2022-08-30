import { db } from 'src/lib/db'

export const organisations = () => {
  return db.organisation.findMany()
}

export const organisation = ({ id }) => {
  return db.organisation.findUnique({
    where: { id },
  })
}

export const createOrganisation = ({ input }) => {
  return db.organisation.create({
    data: input,
  })
}

export const updateOrganisation = ({ id, input }) => {
  return db.organisation.update({
    data: input,
    where: { id },
  })
}

export const deleteOrganisation = ({ id }) => {
  return db.organisation.delete({
    where: { id },
  })
}

export const userOrganisations = ({ owner_id }) =>{
  return db.organisation.findMany({where: {owner_id : owner_id}});
}

export const Organisation = {
  User_Organisation: (_obj, { root }) =>
    db.organisation.findUnique({ where: { id: root.id } }).User_Organisation(),
  Organisation_Project: (_obj, { root }) =>
    db.organisation
      .findUnique({ where: { id: root.id } })
      .Organisation_Project(),
}
