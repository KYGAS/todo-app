import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_TASK_ON_MESSAGE_MUTATION = gql`
  mutation DeleteTaskOnMessageMutation($id: Int!) {
    deleteTaskOnMessage(id: $id) {
      id
    }
  }
`

const formatEnum = (values) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const TaskOnMessage = ({ taskOnMessage }) => {
  const [deleteTaskOnMessage] = useMutation(DELETE_TASK_ON_MESSAGE_MUTATION, {
    onCompleted: () => {
      toast.success('TaskOnMessage deleted')
      navigate(routes.taskOnMessages())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete taskOnMessage ' + id + '?')) {
      deleteTaskOnMessage({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            TaskOnMessage {taskOnMessage.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{taskOnMessage.id}</td>
            </tr>
            <tr>
              <th>Task id</th>
              <td>{taskOnMessage.task_id}</td>
            </tr>
            <tr>
              <th>Message id</th>
              <td>{taskOnMessage.message_id}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTaskOnMessage({ id: taskOnMessage.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(taskOnMessage.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default TaskOnMessage
