import { useAuth } from '@redwoodjs/auth';
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const OrganisationFormAddUser = (props) => {


  const onSubmit = (data) => {
    data.organisation_id = props.organisation.id
    props.onSave(data, props?.organisation?.id)
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
          UserID
        </Label>

        <NumberField
          name="user_id"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

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
