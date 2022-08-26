import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TaskOnMessageForm from 'src/components/TaskOnMessage/TaskOnMessageForm'

export const QUERY = gql`
  query EditTaskOnMessageById($id: Int!) {
    taskOnMessage: taskOnMessage(id: $id) {
      id
      task_id
      message_id
    }
  }
`
const UPDATE_TASK_ON_MESSAGE_MUTATION = gql`
  mutation UpdateTaskOnMessageMutation(
    $id: Int!
    $input: UpdateTaskOnMessageInput!
  ) {
    updateTaskOnMessage(id: $id, input: $input) {
      id
      task_id
      message_id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ taskOnMessage }) => {
  const [updateTaskOnMessage, { loading, error }] = useMutation(
    UPDATE_TASK_ON_MESSAGE_MUTATION,
    {
      onCompleted: () => {
        toast.success('TaskOnMessage updated')
        navigate(routes.taskOnMessages())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateTaskOnMessage({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit TaskOnMessage {taskOnMessage.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <TaskOnMessageForm
          taskOnMessage={taskOnMessage}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
