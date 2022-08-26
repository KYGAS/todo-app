import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TaskOnMessageForm from 'src/components/TaskOnMessage/TaskOnMessageForm'

const CREATE_TASK_ON_MESSAGE_MUTATION = gql`
  mutation CreateTaskOnMessageMutation($input: CreateTaskOnMessageInput!) {
    createTaskOnMessage(input: $input) {
      id
    }
  }
`

const NewTaskOnMessage = () => {
  const [createTaskOnMessage, { loading, error }] = useMutation(
    CREATE_TASK_ON_MESSAGE_MUTATION,
    {
      onCompleted: () => {
        toast.success('TaskOnMessage created')
        navigate(routes.taskOnMessages())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createTaskOnMessage({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New TaskOnMessage</h2>
      </header>
      <div className="rw-segment-main">
        <TaskOnMessageForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewTaskOnMessage
