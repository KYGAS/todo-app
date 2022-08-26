import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UserOnOrganisationForm from 'src/components/UserOnOrganisation/UserOnOrganisationForm'

export const QUERY = gql`
  query EditUserOnOrganisationById($id: Int!) {
    userOnOrganisation: userOnOrganisation(id: $id) {
      id
      user_id
      organisation_id
    }
  }
`
const UPDATE_USER_ON_ORGANISATION_MUTATION = gql`
  mutation UpdateUserOnOrganisationMutation(
    $id: Int!
    $input: UpdateUserOnOrganisationInput!
  ) {
    updateUserOnOrganisation(id: $id, input: $input) {
      id
      user_id
      organisation_id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ userOnOrganisation }) => {
  const [updateUserOnOrganisation, { loading, error }] = useMutation(
    UPDATE_USER_ON_ORGANISATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserOnOrganisation updated')
        navigate(routes.userOnOrganisations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateUserOnOrganisation({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit UserOnOrganisation {userOnOrganisation.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <UserOnOrganisationForm
          userOnOrganisation={userOnOrganisation}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
