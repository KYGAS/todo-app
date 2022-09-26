import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
  SelectField,
} from '@redwoodjs/forms'
import { useQuery } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

export const QUERY = gql`
  query FindOrganisations {
    users{
      id
      username
      email
      fName
      lName
      hashedPassword
      salt
      resetToken
      resetTokenExpiresAt
      User_Organisation {
        organisation {
          id
          name
          owner_id
          Organisation_Project {
            project {
              id
              name
              Project_Task {
                task{
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`


const MessageForm = (props) => {

  let id = useAuth().currentUser.id;
  let taskId = props.task;

  const onSubmit = (data) => {
    data.emails = data.emails.join(",")
    data.creator_id = id;
    props.onSave(data, props?.message?.id)
  }

  const queryUsers = useQuery(
    QUERY,
    {
      onCompleted: () => {
        toast.success('Users fetched')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  let selectableUsers = []
  if(queryUsers.data)
  for( let user of queryUsers.data.users){
    for( let org of user.User_Organisation){
      org = org.organisation;
      for( let project of org.Organisation_Project){
        project = project.project;
        for( let task of project.Project_Task){
          task = task.task;
          if(task.id == taskId){
            selectableUsers.push(user)
          }
        }
      }
    }
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="message"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Message
        </Label>

        <TextField
          name="message"
          defaultValue={props.message?.message}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="emails" className="rw-field-error" />

        <Label
          name="emails"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Emails to notify about the message : ( separate by , )
        </Label>

        <SelectField
          multiple={true}
          name="emails"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={
            {
              required: true,
              validate: {
                matchesInitialValue: (value)=>{
                  let returnValue = [true]
                  returnValue = value.map(element=>{
                    if(element === 'Please select an option')
                      return 'Select an Option'
                  })
                  return returnValue[0]
                }
              }
            }
          }
        >
          <option>Please select an option</option>
          {
            selectableUsers.map(user=>(<option key={user.id} value={user.email}>{user.username}</option>))
          }
        </SelectField>

        <FieldError name="emails" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default MessageForm
