import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/UserOnOrganisation/UserOnOrganisationsCell'

const DELETE_USER_ON_ORGANISATION_MUTATION = gql`
  mutation DeleteUserOnOrganisationMutation($id: Int!) {
    deleteUserOnOrganisation(id: $id) {
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

const UserOnOrganisationsList = ({ userOnOrganisations }) => {
  const [deleteUserOnOrganisation] = useMutation(
    DELETE_USER_ON_ORGANISATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserOnOrganisation deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete userOnOrganisation ' + id + '?')
    ) {
      deleteUserOnOrganisation({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User id</th>
            <th>Organisation id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {userOnOrganisations.map((userOnOrganisation) => (
            <tr key={userOnOrganisation.id}>
              <td>{truncate(userOnOrganisation.id)}</td>
              <td>{truncate(userOnOrganisation.user_id)}</td>
              <td>{truncate(userOnOrganisation.organisation_id)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.userOnOrganisation({
                      id: userOnOrganisation.id,
                    })}
                    title={
                      'Show userOnOrganisation ' +
                      userOnOrganisation.id +
                      ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editUserOnOrganisation({
                      id: userOnOrganisation.id,
                    })}
                    title={'Edit userOnOrganisation ' + userOnOrganisation.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete userOnOrganisation ' + userOnOrganisation.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(userOnOrganisation.id)}
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

export default UserOnOrganisationsList
