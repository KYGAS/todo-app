import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ProjectOnTaskForm from 'src/components/ProjectOnTask/ProjectOnTaskForm'

const CREATE_PROJECT_ON_TASK_MUTATION = gql`
  mutation CreateProjectOnTaskMutation($input: CreateProjectOnTaskInput!) {
    createProjectOnTask(input: $input) {
      id
    }
  }
`

const NewProjectOnTask = () => {
  const [createProjectOnTask, { loading, error }] = useMutation(
    CREATE_PROJECT_ON_TASK_MUTATION,
    {
      onCompleted: () => {
        toast.success('ProjectOnTask created')
        navigate(routes.projectOnTasks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createProjectOnTask({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ProjectOnTask</h2>
      </header>
      <div className="rw-segment-main">
        <ProjectOnTaskForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewProjectOnTask
