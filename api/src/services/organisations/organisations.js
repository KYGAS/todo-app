import { db } from 'src/lib/db'

export const organisations = ({currentUser}) => {
  console.log(currentUser);
  return db.organisation.findMany()
}

export const organisation = ({ id }) => {
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
    })
  })

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


export const updateOrganisationAddUser = ({id, input}) => {
  return db.userOnOrganisation.create({
    data : input
  })
}

export const deleteOrganisation = (input, arg2, arg3) => {

  return db.organisation.findUnique({
    where : {
      id : input.id
    }
  }).then( org =>{
    if(org.owner_id == input.logged_id){
      return db.userOnOrganisation.deleteMany({
        where: { organisation_id : input.id }
      }).then(_=>{
        return db.organisation.delete({
          where:{
            id: org.id
          }
        })
      })
    }else{
      return db.userOnOrganisation.deleteMany({
        where:{
          organisation_id: input.id,
          user_id: input.logged_id
        }
      }).then(_=>{
        return db.organisation.findFirst()
      })
    }
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
