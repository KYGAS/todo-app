import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_ORGANISATION_ON_PROJECT_MUTATION = gql`
  mutation DeleteOrganisationOnProjectMutation($id: Int!) {
    deleteOrganisationOnProject(id: $id) {
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

const OrganisationOnProject = ({ organisationOnProject }) => {
  const [deleteOrganisationOnProject] = useMutation(
    DELETE_ORGANISATION_ON_PROJECT_MUTATION,
    {
      onCompleted: () => {
        toast.success('OrganisationOnProject deleted')
        navigate(routes.organisationOnProjects())
      },
      onError: (error) => {
        toast.error(error.message)
      },
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
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            OrganisationOnProject {organisationOnProject.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{organisationOnProject.id}</td>
            </tr>
            <tr>
              <th>Organisation id</th>
              <td>{organisationOnProject.organisation_id}</td>
            </tr>
            <tr>
              <th>Project id</th>
              <td>{organisationOnProject.project_id}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editOrganisationOnProject({
            id: organisationOnProject.id,
          })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(organisationOnProject.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default OrganisationOnProject
