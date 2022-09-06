export const schema = gql`
  type Organisation {
    id: Int!
    name: String!
    owner_id: Int!
    User_Organisation: [UserOnOrganisation]!
    Organisation_Project: [OrganisationOnProject]!
  }

  type Query {
    organisations: [Organisation!]! @skipAuth
    organisation(id: Int!): Organisation @skipAuth
  }

  input CreateOrganisationInput {
    name: String!
    owner_id: Int!
  }

  input UpdateOrganisationInput {
    name: String
    owner_id: Int
  }
  input UpdateOrganisationAddUserInput {
    user_id : Int
    organisation_id : Int
  }

  type Mutation {
    createOrganisation(input: CreateOrganisationInput!): Organisation!
      @requireAuth
    updateOrganisation(
      id: Int!
      input: UpdateOrganisationInput!
    ): Organisation! @requireAuth
    updateOrganisationAddUser( input: UpdateOrganisationAddUserInput! ): Organisation!
     @requireAuth
    deleteOrganisation(
      id: Int!
      logged_id: Int!
      ): Organisation! @requireAuth
  }
`
