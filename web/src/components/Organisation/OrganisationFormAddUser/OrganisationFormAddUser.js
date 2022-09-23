import { useAuth } from '@redwoodjs/auth';
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
  SelectField,
} from '@redwoodjs/forms'
import { usePageLoadingContext } from '@redwoodjs/router';
import { useQuery } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

const USERS_QUERY = gql`
query FindUsers {
  users {
    id
    username
    email
    fName
    lName
    hashedPassword
    salt
    resetToken
    resetTokenExpiresAt
  }
}
`



const OrganisationFormAddUser = (props) => {

  const queryUsers = useQuery(
    USERS_QUERY,
    {
      onCompleted: () => {
        toast.success('Users fetched')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )
  const onSubmit = (data) => {
    console.log(data);

    for(let user of data.user_id){
      let dataObj = {}
      dataObj.organisation_id = props.organisation.id
      dataObj.user_id = parseInt(user)
      props.onSave(dataObj, props?.organisation?.id)
    }
    return;
  }

  let isOwnerForm = useAuth().currentUser.id==props.organisation.owner_id?(
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="user_id"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User Name
        </Label>

        <SelectField
          multiple={true}
          name="user_id"
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
            queryUsers.data?.users.map(user=>(<option key={user.id} value={user.id}>{user.username}</option>))
          }
        </SelectField>

        <FieldError name="user_id" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Add User
          </Submit>
        </div>
      </Form>
    </div>
  ):(<></>);

  return isOwnerForm
}

export default OrganisationFormAddUser
