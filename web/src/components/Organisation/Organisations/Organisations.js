import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Organisation/OrganisationsCell'
import { useAuth } from '@redwoodjs/auth'

const DELETE_ORGANISATION_MUTATION = gql`
  mutation DeleteOrganisationMutation($id: Int!, $logged_id: Int!) {
    deleteOrganisation(id: $id, logged_id: $logged_id) {
      id
    }
  }
`


export const QUERY_USERS_ORGANISATIONS = gql`
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

const OrganisationsList = ({ organisations }) => {

  const [deleteOrganisation] = useMutation(DELETE_ORGANISATION_MUTATION, {
    onCompleted: () => {
      toast.success('Organisation deleted')
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
  let logged_user = useAuth().currentUser.id;
  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete organisation ' + id + '?')) {
      deleteOrganisation({ variables: { id, logged_id : logged_user } })
    }
  }

  const queryUsers = useQuery(
    QUERY_USERS_ORGANISATIONS,
    {
      onCompleted: () => {
        toast.success('Users fetched')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Owner id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {organisations.map((organisation) => { organisation = organisation.organisation;
          console.log(organisation);


            let organisationOwner;
            if(queryUsers.data) for(let user of queryUsers.data.users){
              if(user.id == organisation.owner_id) organisationOwner = user.username;
            }

            return (
            <tr key={organisation.id}>
              <td>{truncate(organisation.id)}</td>
              <td>{truncate(organisation.name)}</td>
              <td>{truncate(organisationOwner?organisationOwner:organisation.owner_id)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.organisation({ id: organisation.id })}
                    title={'Show organisation ' + organisation.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editOrganisation({ id: organisation.id })}
                    title={'Edit organisation ' + organisation.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete organisation ' + organisation.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(organisation.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  )
}

export default OrganisationsList
