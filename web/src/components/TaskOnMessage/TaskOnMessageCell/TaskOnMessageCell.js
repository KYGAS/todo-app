import TaskOnMessage from 'src/components/TaskOnMessage/TaskOnMessage'

export const QUERY = gql`
  query FindTaskOnMessageById($id: Int!) {
    taskOnMessage: taskOnMessage(id: $id) {
      id
      task_id
      message_id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>TaskOnMessage not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ taskOnMessage }) => {
  return <TaskOnMessage taskOnMessage={taskOnMessage} />
}
