import { db } from 'src/lib/db'

export const organisations = () => {
  console.log("Test1");
  return db.organisation.findMany()
}

export const organisation = ({ id }) => {
  console.log("Test2");
  return db.organisation.findUnique({
    where: { id },
  })
}

export const createOrganisation = ({ input, currentUser }) => {


  db.organisation.count().then(_=>{
      db.userOnOrganisation.create({
        data : {
          user_id : input.owner_id,
          organisation_id : _+1
        }
      }).then(_=>{
        console.log("SUCCESS");
      })
  })

  // db.userOnOrganisation.create({
  //   data : {
  //     user_id : input.owner_id,
  //     organisation_id :
  //   }
  // }).then(_=>{
  //   console.log(_);
  // }).catch(_=>{
  //   console.log(_);
  // })

  return db.organisation.create({
    data: input,
  })
}

export const updateOrganisation = ({ id, input }) => {
  console.log("Test4");
  return db.organisation.update({
    data: input,
    where: { id },
  })
}

export const deleteOrganisation = ({ id }) => {
  console.log("Test5");
  return db.organisation.delete({
    where: { id },
  })
}

export const userOrganisations = () =>{
    return db.organisation.findMany({where: {owner_id : 3}});
}

export const Organisation = {
  User_Organisation: (_obj, { root }) =>
    db.organisation.findUnique({ where: { id: root.id } }).User_Organisation(),
  Organisation_Project: (_obj, { root }) =>
    db.organisation
      .findUnique({ where: { id: root.id } })
      .Organisation_Project(),
}
