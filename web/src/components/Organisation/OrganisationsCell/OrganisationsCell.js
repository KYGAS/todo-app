import { Link, routes } from '@redwoodjs/router'

import Organisations from 'src/components/Organisation/Organisations'

export const QUERY = gql`
  query FindOrganisations {
    organisations {
      id
      name
      owner_id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No organisations yet. '}
      <Link to={routes.newOrganisation()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ organisations }) => {
  return <Organisations organisations={organisations} />
}
