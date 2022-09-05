import { db } from 'src/lib/db'

export const organisations = ({currentUser}) => {
  console.log("Test1");
  console.log(currentUser);
  return db.organisation.findMany()
}

export const organisation = ({ id }) => {
  console.log("Test2");
  return db.organisation.findUnique({
    where: { id },
  })
}

export const createOrganisation = ({ input, currentUser }) => {

  db.organisation.findMany().then(_=>{
    let ID = 0;
    for( let org of _ ){
      ID = org.id
    }
    db.userOnOrganisation.create({
      data : {
        user_id : input.owner_id,
        organisation_id : ID+1
      }
    }).then(_=>{
      console.log("SUCCESS");
    })
  })

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


export const updateOrganisationAddUser = ({id, input}) => {
  return db.userOnOrganisation.create({
    data : input
  })
}

export const deleteOrganisation = ({ id }) => {

  return db.userOnOrganisation.deleteMany({
    where: { organisation_id : id }
  }).then(_=>{
    console.log("Deleted link!");
    return db.organisation.delete({
      where: { id },
    }).then(_=>{
      return db.organisation.findFirst()
    })
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
