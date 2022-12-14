export const schema = gql`
  type Project {
    id: Int!
    name: String!
    Organisation_Project: [OrganisationOnProject]!
    Project_Task: [ProjectOnTask]!
  }

  type Query {
    projects: [Project!]! @requireAuth
    project(id: Int!): Project @requireAuth
  }

  input CreateProjectInput {
    name: String!
  }

  input UpdateProjectInput {
    name: String
  }

  type Mutation {
    createProject(input: CreateProjectInput!, org_id: Int!): Project! @requireAuth
    updateProject(id: Int!, input: UpdateProjectInput!): Project! @requireAuth
    deleteProject(id: Int!): Project! @requireAuth
  }
`
