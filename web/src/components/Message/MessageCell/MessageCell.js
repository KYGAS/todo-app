import Message from 'src/components/Message/Message'

export const QUERY = gql`
  query FindMessageById($id: Int!) {
    message: message(id: $id) {
      id
      creator_id
      message
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Message not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ message }) => {
  return <Message message={message} />
}
