import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const OrganisationOnProjectForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.organisationOnProject?.id)
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
          name="organisation_id"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Organisation id
        </Label>

        <NumberField
          name="organisation_id"
          defaultValue={props.organisationOnProject?.organisation_id}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="organisation_id" className="rw-field-error" />

        <Label
          name="project_id"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Project id
        </Label>

        <NumberField
          name="project_id"
          defaultValue={props.organisationOnProject?.project_id}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="project_id" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default OrganisationOnProjectForm
