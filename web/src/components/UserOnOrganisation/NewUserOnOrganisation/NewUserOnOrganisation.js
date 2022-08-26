import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UserOnOrganisationForm from 'src/components/UserOnOrganisation/UserOnOrganisationForm'

const CREATE_USER_ON_ORGANISATION_MUTATION = gql`
  mutation CreateUserOnOrganisationMutation(
    $input: CreateUserOnOrganisationInput!
  ) {
    createUserOnOrganisation(input: $input) {
      id
    }
  }
`

const NewUserOnOrganisation = () => {
  const [createUserOnOrganisation, { loading, error }] = useMutation(
    CREATE_USER_ON_ORGANISATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserOnOrganisation created')
        navigate(routes.userOnOrganisations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createUserOnOrganisation({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New UserOnOrganisation
        </h2>
      </header>
      <div className="rw-segment-main">
        <UserOnOrganisationForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewUserOnOrganisation
