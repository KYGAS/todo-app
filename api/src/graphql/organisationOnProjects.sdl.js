export const schema = gql`
  type OrganisationOnProject {
    id: Int!
    organisation: Organisation!
    organisation_id: Int!
    project: Project!
    project_id: Int!
  }

  type Query {
    organisationOnProjects: [OrganisationOnProject!]! @requireAuth
    organisationOnProject(id: Int!): OrganisationOnProject @requireAuth
  }

  input CreateOrganisationOnProjectInput {
    organisation_id: Int!
    project_id: Int!
  }

  input UpdateOrganisationOnProjectInput {
    organisation_id: Int
    project_id: Int
  }

  type Mutation {
    createOrganisationOnProject(
      input: CreateOrganisationOnProjectInput!
    ): OrganisationOnProject! @requireAuth
    updateOrganisationOnProject(
      id: Int!
      input: UpdateOrganisationOnProjectInput!
    ): OrganisationOnProject! @requireAuth
    deleteOrganisationOnProject(id: Int!): OrganisationOnProject! @requireAuth
  }
`
