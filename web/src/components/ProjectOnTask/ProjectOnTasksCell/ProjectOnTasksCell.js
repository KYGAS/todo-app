import { Link, routes } from '@redwoodjs/router'

import ProjectOnTasks from 'src/components/ProjectOnTask/ProjectOnTasks'

export const QUERY = gql`
  query FindProjectOnTasks {
    projectOnTasks {
      id
      project_id
      task_id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No projectOnTasks yet. '}
      <Link to={routes.newProjectOnTask()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ projectOnTasks }) => {
  return <ProjectOnTasks projectOnTasks={projectOnTasks} />
}
