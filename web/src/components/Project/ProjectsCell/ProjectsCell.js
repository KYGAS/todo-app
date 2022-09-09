import { Link, routes } from '@redwoodjs/router'

import Projects from 'src/components/Project/Projects'

export const QUERY = gql`
  query FindProjects {
    linkedProjects : organisations {
      id
      Organisation_Project {
        project {
          id
          name
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No projects yet. '}
      <Link to={routes.newProject()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ linkedProjects, organisation }) => {

  let projects = [];

  for(let org of linkedProjects){
    if(org.id == organisation.id){
      projects = org;
      break;
    }
  }

  projects = projects.Organisation_Project

  return <Projects projects={projects} />
}
