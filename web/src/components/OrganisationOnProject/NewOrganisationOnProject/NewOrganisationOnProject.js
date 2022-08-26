import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import OrganisationOnProjectForm from 'src/components/OrganisationOnProject/OrganisationOnProjectForm'

const CREATE_ORGANISATION_ON_PROJECT_MUTATION = gql`
  mutation CreateOrganisationOnProjectMutation(
    $input: CreateOrganisationOnProjectInput!
  ) {
    createOrganisationOnProject(input: $input) {
      id
    }
  }
`

const NewOrganisationOnProject = () => {
  const [createOrganisationOnProject, { loading, error }] = useMutation(
    CREATE_ORGANISATION_ON_PROJECT_MUTATION,
    {
      onCompleted: () => {
        toast.success('OrganisationOnProject created')
        navigate(routes.organisationOnProjects())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createOrganisationOnProject({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New OrganisationOnProject
        </h2>
      </header>
      <div className="rw-segment-main">
        <OrganisationOnProjectForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewOrganisationOnProject
