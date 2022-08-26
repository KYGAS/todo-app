import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ProjectOnTaskForm from 'src/components/ProjectOnTask/ProjectOnTaskForm'

export const QUERY = gql`
  query EditProjectOnTaskById($id: Int!) {
    projectOnTask: projectOnTask(id: $id) {
      id
      project_id
      task_id
    }
  }
`
const UPDATE_PROJECT_ON_TASK_MUTATION = gql`
  mutation UpdateProjectOnTaskMutation(
    $id: Int!
    $input: UpdateProjectOnTaskInput!
  ) {
    updateProjectOnTask(id: $id, input: $input) {
      id
      project_id
      task_id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ projectOnTask }) => {
  const [updateProjectOnTask, { loading, error }] = useMutation(
    UPDATE_PROJECT_ON_TASK_MUTATION,
    {
      onCompleted: () => {
        toast.success('ProjectOnTask updated')
        navigate(routes.projectOnTasks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateProjectOnTask({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ProjectOnTask {projectOnTask.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ProjectOnTaskForm
          projectOnTask={projectOnTask}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
