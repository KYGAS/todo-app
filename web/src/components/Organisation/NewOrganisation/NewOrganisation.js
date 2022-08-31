import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import OrganisationForm from 'src/components/Organisation/OrganisationForm'

const CREATE_ORGANISATION_MUTATION = gql`
  mutation CreateOrganisationMutation($input: CreateOrganisationInput!) {
    createOrganisation(input: $input) {
      id
    }
  }
`

const NewOrganisation = () => {

  const { isAuthenticated, currentUser, logOut } = useAuth()

  const [createOrganisation, { loading, error }] = useMutation(
    CREATE_ORGANISATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Organisation created')
        navigate(routes.organisations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {

    createOrganisation({ variables: { input, currentUser } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Organisation</h2>
      </header>
      <div className="rw-segment-main">
        <OrganisationForm onSave={onSave} loading={loading} error={error} currentUser={currentUser} />
      </div>
    </div>
  )
}

export default NewOrganisation
