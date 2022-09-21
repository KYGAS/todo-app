import { Link, routes } from '@redwoodjs/router'

import Tasks from 'src/components/Task/Tasks'

export const QUERY = gql`
  query FindTasks {
    linkedTasks : projects {
      id
      Project_Task {
        task {
          id
          name
          status
          responsible_person_id
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No tasks yet. '}
      <Link to={routes.newTask()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ linkedTasks, project }) => {

  console.log(linkedTasks);

  let tasks = [];

  for(let tasksObj of linkedTasks){
    if(tasksObj.id == project.id){
      tasks = tasksObj;
      break;
    }
  }
  tasks = tasks.Project_Task;
  return <Tasks tasks={tasks} />
}
