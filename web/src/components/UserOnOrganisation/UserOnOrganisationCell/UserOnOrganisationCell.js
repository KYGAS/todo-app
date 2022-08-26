import UserOnOrganisation from 'src/components/UserOnOrganisation/UserOnOrganisation'

export const QUERY = gql`
  query FindUserOnOrganisationById($id: Int!) {
    userOnOrganisation: userOnOrganisation(id: $id) {
      id
      user_id
      organisation_id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>UserOnOrganisation not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ userOnOrganisation }) => {
  return <UserOnOrganisation userOnOrganisation={userOnOrganisation} />
}
