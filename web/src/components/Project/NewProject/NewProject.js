import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ProjectForm from 'src/components/Project/ProjectForm'

const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProjectMutation($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
    }
  }
`

const NewProject = () => {
  const [createProject, { loading, error }] = useMutation(
    CREATE_PROJECT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Project created')
        navigate(routes.organisations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createProject({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Project</h2>
      </header>
      <div className="rw-segment-main">
        <ProjectForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewProject
