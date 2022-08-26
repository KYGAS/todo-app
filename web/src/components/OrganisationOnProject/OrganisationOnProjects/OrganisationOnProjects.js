import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/OrganisationOnProject/OrganisationOnProjectsCell'

const DELETE_ORGANISATION_ON_PROJECT_MUTATION = gql`
  mutation DeleteOrganisationOnProjectMutation($id: Int!) {
    deleteOrganisationOnProject(id: $id) {
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

const OrganisationOnProjectsList = ({ organisationOnProjects }) => {
  const [deleteOrganisationOnProject] = useMutation(
    DELETE_ORGANISATION_ON_PROJECT_MUTATION,
    {
      onCompleted: () => {
        toast.success('OrganisationOnProject deleted')
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
      confirm(
        'Are you sure you want to delete organisationOnProject ' + id + '?'
      )
    ) {
      deleteOrganisationOnProject({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Organisation id</th>
            <th>Project id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {organisationOnProjects.map((organisationOnProject) => (
            <tr key={organisationOnProject.id}>
              <td>{truncate(organisationOnProject.id)}</td>
              <td>{truncate(organisationOnProject.organisation_id)}</td>
              <td>{truncate(organisationOnProject.project_id)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.organisationOnProject({
                      id: organisationOnProject.id,
                    })}
                    title={
                      'Show organisationOnProject ' +
                      organisationOnProject.id +
                      ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editOrganisationOnProject({
                      id: organisationOnProject.id,
                    })}
                    title={
                      'Edit organisationOnProject ' + organisationOnProject.id
                    }
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={
                      'Delete organisationOnProject ' + organisationOnProject.id
                    }
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(organisationOnProject.id)}
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

export default OrganisationOnProjectsList
