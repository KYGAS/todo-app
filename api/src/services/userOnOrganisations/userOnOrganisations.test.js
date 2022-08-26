import {
  userOnOrganisations,
  userOnOrganisation,
  createUserOnOrganisation,
  updateUserOnOrganisation,
  deleteUserOnOrganisation,
} from './userOnOrganisations'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userOnOrganisations', () => {
  scenario('returns all userOnOrganisations', async (scenario) => {
    const result = await userOnOrganisations()

    expect(result.length).toEqual(
      Object.keys(scenario.userOnOrganisation).length
    )
  })

  scenario('returns a single userOnOrganisation', async (scenario) => {
    const result = await userOnOrganisation({
      id: scenario.userOnOrganisation.one.id,
    })

    expect(result).toEqual(scenario.userOnOrganisation.one)
  })

  scenario('creates a userOnOrganisation', async (scenario) => {
    const result = await createUserOnOrganisation({
      input: {
        user_id: scenario.userOnOrganisation.two.user_id,
        organisation_id: scenario.userOnOrganisation.two.organisation_id,
      },
    })

    expect(result.user_id).toEqual(scenario.userOnOrganisation.two.user_id)
    expect(result.organisation_id).toEqual(
      scenario.userOnOrganisation.two.organisation_id
    )
  })

  scenario('updates a userOnOrganisation', async (scenario) => {
    const original = await userOnOrganisation({
      id: scenario.userOnOrganisation.one.id,
    })

    const result = await updateUserOnOrganisation({
      id: original.id,
      input: { user_id: scenario.userOnOrganisation.two.user_id },
    })

    expect(result.user_id).toEqual(scenario.userOnOrganisation.two.user_id)
  })

  scenario('deletes a userOnOrganisation', async (scenario) => {
    const original = await deleteUserOnOrganisation({
      id: scenario.userOnOrganisation.one.id,
    })

    const result = await userOnOrganisation({ id: original.id })

    expect(result).toEqual(null)
  })
})
