import {
  organisations,
  organisation,
  createOrganisation,
  updateOrganisation,
  deleteOrganisation,
} from './organisations'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('organisations', () => {
  scenario('returns all organisations', async (scenario) => {
    const result = await organisations()

    expect(result.length).toEqual(Object.keys(scenario.organisation).length)
  })

  scenario('returns a single organisation', async (scenario) => {
    const result = await organisation({ id: scenario.organisation.one.id })

    expect(result).toEqual(scenario.organisation.one)
  })

  scenario('creates a organisation', async () => {
    const result = await createOrganisation({
      input: { name: 'String', owner_id: 2693297 },
    })

    expect(result.name).toEqual('String')
    expect(result.owner_id).toEqual(2693297)
  })

  scenario('updates a organisation', async (scenario) => {
    const original = await organisation({ id: scenario.organisation.one.id })
    const result = await updateOrganisation({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a organisation', async (scenario) => {
    const original = await deleteOrganisation({
      id: scenario.organisation.one.id,
    })

    const result = await organisation({ id: original.id })

    expect(result).toEqual(null)
  })
})
