export const schema = gql`
  type Message {
    id: Int!
    creator_id: Int!
    message: String!
    Task_Message: [TaskOnMessage]!
  }

  type Query {
    messages: [Message!]! @requireAuth
    message(id: Int!): Message @requireAuth
  }

  input CreateMessageInput {
    creator_id: Int!
    message: String!
  }

  input UpdateMessageInput {
    creator_id: Int
    message: String
  }

  type Mutation {
    createMessage(input: CreateMessageInput!): Message! @requireAuth
    updateMessage(id: Int!, input: UpdateMessageInput!): Message! @requireAuth
    deleteMessage(id: Int!): Message! @requireAuth
  }
`
