import { Link, routes } from '@redwoodjs/router'

import TaskOnMessages from 'src/components/TaskOnMessage/TaskOnMessages'

export const QUERY = gql`
  query FindTaskOnMessages {
    taskOnMessages {
      id
      task_id
      message_id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No taskOnMessages yet. '}
      <Link to={routes.newTaskOnMessage()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ taskOnMessages }) => {
  return <TaskOnMessages taskOnMessages={taskOnMessages} />
}
