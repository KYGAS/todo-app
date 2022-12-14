import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MessageForm from 'src/components/Message/MessageForm'

const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessageMutation($input: CreateMessageInput!, $task_id: Int!) {
    createMessage(input: $input, task_id: $task_id) {
      id
    }
  }
`


const EMAIL_USER_MUTATION = gql`
  mutation EmailUserMutation($id: String!) {
    emailUser(id: $id) {
      id
    }
  }
`

const NewMessage = ({id}) => {
  const [createMessage, { loading, error }] = useMutation(
    CREATE_MESSAGE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Message created')
        navigate(routes.organisations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )


  const [emailUser] = useMutation(EMAIL_USER_MUTATION, {
    onCompleted: () => {
      toast.success('Emails sent')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    console.log("Hi");
    emailUser({ variables: { id: '3'} })
    delete input.emails;
    createMessage({ variables: { input, task_id: parseInt(id) } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Message</h2>
      </header>
      <div className="rw-segment-main">
        <MessageForm onSave={onSave} task={id} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewMessage
