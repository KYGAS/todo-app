import { db } from 'src/lib/db'

export const organisationOnProjects = () => {
  return db.organisationOnProject.findMany()
}

export const organisationOnProject = ({ id }) => {
  return db.organisationOnProject.findUnique({
    where: { id },
  })
}

export const createOrganisationOnProject = ({ input }) => {
  return db.organisationOnProject.create({
    data: input,
  })
}

export const updateOrganisationOnProject = ({ id, input }) => {
  return db.organisationOnProject.update({
    data: input,
    where: { id },
  })
}

export const deleteOrganisationOnProject = ({ id }) => {
  return db.organisationOnProject.delete({
    where: { id },
  })
}

export const OrganisationOnProject = {
  organisation: (_obj, { root }) =>
    db.organisationOnProject
      .findUnique({ where: { id: root.id } })
      .organisation(),
  project: (_obj, { root }) =>
    db.organisationOnProject.findUnique({ where: { id: root.id } }).project(),
}
