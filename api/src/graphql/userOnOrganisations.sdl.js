export const schema = gql`
  type UserOnOrganisation {
    id: Int!
    user: User!
    user_id: Int!
    organisation: Organisation!
    organisation_id: Int!
  }

  type Query {
    userOnOrganisations: [UserOnOrganisation!]! @skipAuth
    userOnOrganisation(id: Int!): UserOnOrganisation @skipAuth
  }

  input CreateUserOnOrganisationInput {
    user_id: Int!
    organisation_id: Int!
  }

  input UpdateUserOnOrganisationInput {
    user_id: Int
    organisation_id: Int
  }

  type Mutation {
    createUserOnOrganisation(
      input: CreateUserOnOrganisationInput!
    ): UserOnOrganisation! @requireAuth
    updateUserOnOrganisation(
      id: Int!
      input: UpdateUserOnOrganisationInput!
    ): UserOnOrganisation! @requireAuth
    deleteUserOnOrganisation(
      id: Int!
      input: UpdateUserOnOrganisationInput!
    ): UserOnOrganisation! @requireAuth
  }
`
