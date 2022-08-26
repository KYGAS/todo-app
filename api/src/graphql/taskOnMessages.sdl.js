export const schema = gql`
  type TaskOnMessage {
    id: Int!
    task: Task!
    task_id: Int!
    message: Message!
    message_id: Int!
  }

  type Query {
    taskOnMessages: [TaskOnMessage!]! @requireAuth
    taskOnMessage(id: Int!): TaskOnMessage @requireAuth
  }

  input CreateTaskOnMessageInput {
    task_id: Int!
    message_id: Int!
  }

  input UpdateTaskOnMessageInput {
    task_id: Int
    message_id: Int
  }

  type Mutation {
    createTaskOnMessage(input: CreateTaskOnMessageInput!): TaskOnMessage!
      @requireAuth
    updateTaskOnMessage(
      id: Int!
      input: UpdateTaskOnMessageInput!
    ): TaskOnMessage! @requireAuth
    deleteTaskOnMessage(id: Int!): TaskOnMessage! @requireAuth
  }
`
