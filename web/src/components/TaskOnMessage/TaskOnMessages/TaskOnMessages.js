import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/TaskOnMessage/TaskOnMessagesCell'

const DELETE_TASK_ON_MESSAGE_MUTATION = gql`
  mutation DeleteTaskOnMessageMutation($id: Int!) {
    deleteTaskOnMessage(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

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

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const TaskOnMessagesList = ({ taskOnMessages }) => {
  const [deleteTaskOnMessage] = useMutation(DELETE_TASK_ON_MESSAGE_MUTATION, {
    onCompleted: () => {
      toast.success('TaskOnMessage deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete taskOnMessage ' + id + '?')) {
      deleteTaskOnMessage({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Task id</th>
            <th>Message id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {taskOnMessages.map((taskOnMessage) => (
            <tr key={taskOnMessage.id}>
              <td>{truncate(taskOnMessage.id)}</td>
              <td>{truncate(taskOnMessage.task_id)}</td>
              <td>{truncate(taskOnMessage.message_id)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.taskOnMessage({ id: taskOnMessage.id })}
                    title={'Show taskOnMessage ' + taskOnMessage.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editTaskOnMessage({ id: taskOnMessage.id })}
                    title={'Edit taskOnMessage ' + taskOnMessage.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete taskOnMessage ' + taskOnMessage.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(taskOnMessage.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TaskOnMessagesList
