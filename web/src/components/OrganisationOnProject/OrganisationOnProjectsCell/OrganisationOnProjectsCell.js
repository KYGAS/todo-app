import { Link, routes } from '@redwoodjs/router'

import OrganisationOnProjects from 'src/components/OrganisationOnProject/OrganisationOnProjects'

export const QUERY = gql`
  query FindOrganisationOnProjects {
    organisationOnProjects {
      id
      organisation_id
      project_id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No organisationOnProjects yet. '}
      <Link to={routes.newOrganisationOnProject()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ organisationOnProjects }) => {
  return (
    <OrganisationOnProjects organisationOnProjects={organisationOnProjects} />
  )
}
