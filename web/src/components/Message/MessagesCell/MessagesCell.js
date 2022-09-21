import { Link, routes } from '@redwoodjs/router'

import Messages from 'src/components/Message/Messages'

export const QUERY = gql`
  query FindMessages {
    linkedMessages : tasks {
      id
      Task_Message {
        message {
          id
          creator_id
          message
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No messages yet. '}
      <Link to={routes.newMessage()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ linkedMessages, task }) => {

  let messages = [];

  for(let messagesObj of linkedMessages){
    if(messagesObj.id == task.id){
      messages = messagesObj;
      break;
    }
  }

  messages = messages.Task_Message;

  return <Messages messages={messages} />
}
