export const schema = gql`
  type ProjectOnTask {
    id: Int!
    project: Project!
    project_id: Int!
    task: Task!
    task_id: Int!
  }

  type Query {
    projectOnTasks: [ProjectOnTask!]! @requireAuth
    projectOnTask(id: Int!): ProjectOnTask @requireAuth
  }

  input CreateProjectOnTaskInput {
    project_id: Int!
    task_id: Int!
  }

  input UpdateProjectOnTaskInput {
    project_id: Int
    task_id: Int
  }

  type Mutation {
    createProjectOnTask(input: CreateProjectOnTaskInput!): ProjectOnTask!
      @requireAuth
    updateProjectOnTask(
      id: Int!
      input: UpdateProjectOnTaskInput!
    ): ProjectOnTask! @requireAuth
    deleteProjectOnTask(id: Int!): ProjectOnTask! @requireAuth
  }
`
