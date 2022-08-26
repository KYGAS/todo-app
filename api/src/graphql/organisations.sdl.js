export const schema = gql`
  type Organisation {
    id: Int!
    name: String!
    owner_id: Int!
    User_Organisation: [UserOnOrganisation]!
    Organisation_Project: [OrganisationOnProject]!
  }

  type Query {
    organisations: [Organisation!]! @requireAuth
    organisation(id: Int!): Organisation @requireAuth
  }

  input CreateOrganisationInput {
    name: String!
    owner_id: Int!
  }

  input UpdateOrganisationInput {
    name: String
    owner_id: Int
  }

  type Mutation {
    createOrganisation(input: CreateOrganisationInput!): Organisation!
      @requireAuth
    updateOrganisation(
      id: Int!
      input: UpdateOrganisationInput!
    ): Organisation! @requireAuth
    deleteOrganisation(id: Int!): Organisation! @requireAuth
  }
`
