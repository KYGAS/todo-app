import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const ProjectOnTaskForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.projectOnTask?.id)
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
          name="project_id"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Project id
        </Label>

        <NumberField
          name="project_id"
          defaultValue={props.projectOnTask?.project_id}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="project_id" className="rw-field-error" />

        <Label
          name="task_id"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Task id
        </Label>

        <NumberField
          name="task_id"
          defaultValue={props.projectOnTask?.task_id}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="task_id" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ProjectOnTaskForm
