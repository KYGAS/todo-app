import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const MessageForm = (props) => {
  let id = useAuth().currentUser.id;
  const onSubmit = (data) => {
    data.creator_id = id;
    props.onSave(data, props?.message?.id)
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

        <TextField
          name="emails"
          defaultValue={props.message?.emails}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

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
