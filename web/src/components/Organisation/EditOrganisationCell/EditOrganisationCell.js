import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import OrganisationForm from 'src/components/Organisation/OrganisationForm'
import OrganisationFormAddUser from '../OrganisationFormAddUser/OrganisationFormAddUser'

export const QUERY = gql`
  query EditOrganisationById($id: Int!) {
    organisation: organisation(id: $id) {
      id
      name
      owner_id
    }
  }
`
const UPDATE_ORGANISATION_MUTATION = gql`
  mutation UpdateOrganisationMutation(
    $id: Int!
    $input: UpdateOrganisationInput!
  ) {
    updateOrganisation(id: $id, input: $input) {
      id
      name
      owner_id
    }
  }
`

const UPDATE_ORGANISATION_ADD_USER_MUTATION = gql`
  mutation UpdateOrganisationAddUserMutation(
    $input: UpdateOrganisationAddUserInput!
  ) {
    updateOrganisationAddUser(input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ organisation }) => {
  const [updateOrganisation, { loading, error }] = useMutation(
    UPDATE_ORGANISATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Organisation updated')
        navigate(routes.organisations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const [updateOrganisationAddUser, dataObject] = useMutation(
    UPDATE_ORGANISATION_ADD_USER_MUTATION,
    {
      onCompleted: () => {
        toast.success('User Added')
        navigate(routes.organisations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateOrganisation({ variables: { id, input } })
  }
  const onAddUser = (input, id) => {
    updateOrganisationAddUser({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Organisation {organisation.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <OrganisationForm
          organisation={organisation}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
      <div className="rw-segment-main">
        <OrganisationFormAddUser
          organisation={organisation}
          onSave={onAddUser}
          error={dataObject.error}
          loading={dataObject.loading}
        />
      </div>
    </div>
  )
}
