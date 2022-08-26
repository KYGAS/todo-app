import OrganisationOnProject from 'src/components/OrganisationOnProject/OrganisationOnProject'

export const QUERY = gql`
  query FindOrganisationOnProjectById($id: Int!) {
    organisationOnProject: organisationOnProject(id: $id) {
      id
      organisation_id
      project_id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>OrganisationOnProject not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ organisationOnProject }) => {
  return <OrganisationOnProject organisationOnProject={organisationOnProject} />
}
