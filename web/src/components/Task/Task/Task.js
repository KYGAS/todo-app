import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTaskMutation($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`



export const QUERY = gql`
  query FindOrganisations {
    users{
      id
      username
      email
      fName
      lName
      hashedPassword
      salt
      resetToken
      resetTokenExpiresAt
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

const Task = ({ task }) => {
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task deleted')
      navigate(routes.tasks())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete task ' + id + '?')) {
      deleteTask({ variables: { id } })
    }
  }


  const queryUsers = useQuery(
    QUERY,
    {
      onCompleted: () => {
        toast.success('Users fetched')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  let taskOwner;
  if(queryUsers.data) for(let user of queryUsers.data.users){
    if(user.id == task.responsible_person_id) taskOwner = user.username;
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Task {task.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{task.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{task.name}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{task.status}</td>
            </tr>
            <tr>
              <th>Responsible person name</th>
              <td>{taskOwner?taskOwner:task.responsible_person_id}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.newMessage({ id: task.id })}
          className="rw-button rw-button-blue"
        >
          Add Message
        </Link>
        <Link
          to={routes.editTask({ id: task.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(task.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Task
