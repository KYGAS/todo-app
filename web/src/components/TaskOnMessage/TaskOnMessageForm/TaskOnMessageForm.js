import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const TaskOnMessageForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.taskOnMessage?.id)
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
          name="task_id"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Task id
        </Label>

        <NumberField
          name="task_id"
          defaultValue={props.taskOnMessage?.task_id}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="task_id" className="rw-field-error" />

        <Label
          name="message_id"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Message id
        </Label>

        <NumberField
          name="message_id"
          defaultValue={props.taskOnMessage?.message_id}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="message_id" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TaskOnMessageForm
