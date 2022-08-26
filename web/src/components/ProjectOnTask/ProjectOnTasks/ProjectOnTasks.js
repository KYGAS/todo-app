import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/ProjectOnTask/ProjectOnTasksCell'

const DELETE_PROJECT_ON_TASK_MUTATION = gql`
  mutation DeleteProjectOnTaskMutation($id: Int!) {
    deleteProjectOnTask(id: $id) {
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

const ProjectOnTasksList = ({ projectOnTasks }) => {
  const [deleteProjectOnTask] = useMutation(DELETE_PROJECT_ON_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('ProjectOnTask deleted')
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
    if (confirm('Are you sure you want to delete projectOnTask ' + id + '?')) {
      deleteProjectOnTask({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Project id</th>
            <th>Task id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {projectOnTasks.map((projectOnTask) => (
            <tr key={projectOnTask.id}>
              <td>{truncate(projectOnTask.id)}</td>
              <td>{truncate(projectOnTask.project_id)}</td>
              <td>{truncate(projectOnTask.task_id)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.projectOnTask({ id: projectOnTask.id })}
                    title={'Show projectOnTask ' + projectOnTask.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editProjectOnTask({ id: projectOnTask.id })}
                    title={'Edit projectOnTask ' + projectOnTask.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete projectOnTask ' + projectOnTask.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(projectOnTask.id)}
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

export default ProjectOnTasksList
