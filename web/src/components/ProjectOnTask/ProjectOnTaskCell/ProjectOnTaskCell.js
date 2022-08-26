import ProjectOnTask from 'src/components/ProjectOnTask/ProjectOnTask'

export const QUERY = gql`
  query FindProjectOnTaskById($id: Int!) {
    projectOnTask: projectOnTask(id: $id) {
      id
      project_id
      task_id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ProjectOnTask not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ projectOnTask }) => {
  return <ProjectOnTask projectOnTask={projectOnTask} />
}
