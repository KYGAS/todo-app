import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'

const DELETE_ORGANISATION_MUTATION = gql`
  mutation DeleteOrganisationMutation($id: Int!, $logged_id: Int!) {
    deleteOrganisation(id: $id, logged_id: $logged_id) {
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

const Organisation = ({ organisation }) => {

  let logged_userId = useAuth().currentUser.id

  const [deleteOrganisation] = useMutation(DELETE_ORGANISATION_MUTATION, {
    onCompleted: () => {
      toast.success('Organisation deleted')
      navigate(routes.organisations())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id, logged_id) => {
    if (confirm('Are you sure you want to delete organisation ' + id + '?')) {
      deleteOrganisation({ variables: { id, logged_id } })
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

  let organisationOwner;
  if(queryUsers.data) for(let user of queryUsers.data.users){
    if(user.id == organisation.owner_id) organisationOwner = user.username;
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Organisation {organisation.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{organisation.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{organisation.name}</td>
            </tr>
            <tr>
              <th>Owner Name</th>
              <td>{organisationOwner?organisationOwner:organisation.owner_id}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.newProject({ id: organisation.id })}
          className="rw-button rw-button-blue"
        >
          Add Project
        </Link>
        <Link
          to={routes.editOrganisation({ id: organisation.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(organisation.id, logged_userId)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Organisation
