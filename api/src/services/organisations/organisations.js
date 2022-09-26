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

  return db.organisation.findMany().then(_=>{
    let ID = 0;
    for( let org of _ ){
      ID = org.id
    }

    return db.organisation.create({
      data: input,
    }).then(_=>{
      return db.userOnOrganisation.create({
        data : {
          user_id : input.owner_id,
          organisation_id : ID+1
        }
      }).then(_=>{
        return db.organisation.findFirst();
      })
    })
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
export const updateOrganisationChangeUser = ({ input }) => {
  return db.userOnOrganisation.findMany({
    where : {
      user_id : 3
    }
  }).then(linkUserOrg =>{
    for(let link of linkUserOrg){
      if(link.organisation_id == input.organisation_id){
        return db.organisationOnProject.findMany({
          where : {
            organisation_id : link.organisation_id
          }
        }).then(linkOrgProj=>{
          for(let linkedProject of linkOrgProj)
            db.projectOnTask.findMany({
              where : {
                project_id : linkedProject.project_id
              }
            }).then(linkProjectTask=>{

              for(let task of linkProjectTask){
                db.task.findUnique({
                  where : { id : task.task_id }
                }).then(uniqueTask=>{
                  uniqueTask.responsible_person_id = input.new_user_id
                  db.task.update({
                    data: uniqueTask,
                    where : { id : uniqueTask.id }
                  }).then(_=>{
                    return;
                  })
                })
              }

            })
          return db.userOnOrganisation.findFirst()
        })
      }
    }
    return db.userOnOrganisation.findFirst()
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
        return db.organisationOnProject.deleteMany({
          where : {
            organisation_id : input.id
          }
        }).then(_=>{
          return db.organisation.delete({
            where:{
              id: org.id
            }
          })
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
