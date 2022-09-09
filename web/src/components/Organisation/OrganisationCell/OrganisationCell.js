import Organisation from 'src/components/Organisation/Organisation'
import ProjectsCell from 'src/components/Project/ProjectsCell'

export const QUERY = gql`
  query FindOrganisationById($id: Int!) {
    organisation: organisation(id: $id) {
      id
      name
      owner_id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Organisation not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ organisation }) => {
  return <>
    <Organisation organisation={organisation} />
    <hr></hr>
      <ProjectsCell organisation={organisation}/>

  </>
}
