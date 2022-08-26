import { Link, routes } from '@redwoodjs/router'

import UserOnOrganisations from 'src/components/UserOnOrganisation/UserOnOrganisations'

export const QUERY = gql`
  query FindUserOnOrganisations {
    userOnOrganisations {
      id
      user_id
      organisation_id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No userOnOrganisations yet. '}
      <Link to={routes.newUserOnOrganisation()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ userOnOrganisations }) => {
  return <UserOnOrganisations userOnOrganisations={userOnOrganisations} />
}
