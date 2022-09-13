export const schema = gql`
  type Task {
    id: Int!
    name: String!
    status: String!
    responsible_person_id: Int!
    Project_Task: [ProjectOnTask]!
    Task_Message: [TaskOnMessage]!
  }

  type Query {
    tasks: [Task!]! @requireAuth
    task(id: Int!): Task @requireAuth
  }

  input CreateTaskInput {
    name: String!
    status: String!
    responsible_person_id: Int!
  }

  input UpdateTaskInput {
    name: String
    status: String
    responsible_person_id: Int
  }

  type Mutation {
    createTask(input: CreateTaskInput!, project_id: Int!): Task! @requireAuth
    updateTask(id: Int!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: Int!): Task! @requireAuth
  }
`
