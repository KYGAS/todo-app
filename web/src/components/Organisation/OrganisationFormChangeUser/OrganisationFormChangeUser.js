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
    data.organisation_id = props.organisation.id
    data.old_user_id = parseInt(data.old_user_id)
    data.new_user_id = parseInt(data.new_user_id)
    props.onSave(data, props?.organisation?.id)
    return;
  }

  let isOwnerForm = useAuth().currentUser.id==props.organisation.owner_id?(<>
    <Form onSubmit={onSubmit} error={props.error}>
            <FormError
              error={props.error}
              wrapperClassName="rw-form-error-wrapper"
              titleClassName="rw-form-error-title"
              listClassName="rw-form-error-list"
            />

            <Label
              name="old_user_id"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Old User Name
            </Label>

            <SelectField
              multiple={false}
              name="old_user_id"
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={
                {
                  required: true,
                  validate: {
                    matchesInitialValue: (value)=>{
                      let returnValue = [true]
                      return returnValue[0]
                    }
                  }
                }
              }
              >
              <option>Please select an option</option>
              {
                queryUsers.data?.users.map(user=>(<option key={user.id} value={user.id}>{user.email}</option>))
              }
            </SelectField>

        <FieldError name="user_id" className="rw-field-error" />


        <Label
              name="new_user_id"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              New User Name
            </Label>

            <SelectField
              multiple={false}
              name="new_user_id"
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={
                {
                  required: true,
                  validate: {
                    matchesInitialValue: (value)=>{
                      let returnValue = [true]
                      return returnValue[0]
                    }
                  }
                }
              }
              >
              <option>Please select an option</option>
              {
                queryUsers.data?.users.map(user=>(<option key={user.id} value={user.id}>{user.email}</option>))
              }
            </SelectField>

        <FieldError name="user_id" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Change responsible user
          </Submit>
        </div>
      </Form>
  </>):(<></>);

  return isOwnerForm
}

export default OrganisationFormAddUser
