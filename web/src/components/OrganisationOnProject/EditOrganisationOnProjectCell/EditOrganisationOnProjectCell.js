import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import OrganisationOnProjectForm from 'src/components/OrganisationOnProject/OrganisationOnProjectForm'

export const QUERY = gql`
  query EditOrganisationOnProjectById($id: Int!) {
    organisationOnProject: organisationOnProject(id: $id) {
      id
      organisation_id
      project_id
    }
  }
`
const UPDATE_ORGANISATION_ON_PROJECT_MUTATION = gql`
  mutation UpdateOrganisationOnProjectMutation(
    $id: Int!
    $input: UpdateOrganisationOnProjectInput!
  ) {
    updateOrganisationOnProject(id: $id, input: $input) {
      id
      organisation_id
      project_id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ organisationOnProject }) => {
  const [updateOrganisationOnProject, { loading, error }] = useMutation(
    UPDATE_ORGANISATION_ON_PROJECT_MUTATION,
    {
      onCompleted: () => {
        toast.success('OrganisationOnProject updated')
        navigate(routes.organisationOnProjects())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateOrganisationOnProject({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit OrganisationOnProject {organisationOnProject.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <OrganisationOnProjectForm
          organisationOnProject={organisationOnProject}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
