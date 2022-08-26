import {
  organisationOnProjects,
  organisationOnProject,
  createOrganisationOnProject,
  updateOrganisationOnProject,
  deleteOrganisationOnProject,
} from './organisationOnProjects'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('organisationOnProjects', () => {
  scenario('returns all organisationOnProjects', async (scenario) => {
    const result = await organisationOnProjects()

    expect(result.length).toEqual(
      Object.keys(scenario.organisationOnProject).length
    )
  })

  scenario('returns a single organisationOnProject', async (scenario) => {
    const result = await organisationOnProject({
      id: scenario.organisationOnProject.one.id,
    })

    expect(result).toEqual(scenario.organisationOnProject.one)
  })

  scenario('creates a organisationOnProject', async (scenario) => {
    const result = await createOrganisationOnProject({
      input: {
        organisation_id: scenario.organisationOnProject.two.organisation_id,
        project_id: scenario.organisationOnProject.two.project_id,
      },
    })

    expect(result.organisation_id).toEqual(
      scenario.organisationOnProject.two.organisation_id
    )

    expect(result.project_id).toEqual(
      scenario.organisationOnProject.two.project_id
    )
  })

  scenario('updates a organisationOnProject', async (scenario) => {
    const original = await organisationOnProject({
      id: scenario.organisationOnProject.one.id,
    })

    const result = await updateOrganisationOnProject({
      id: original.id,
      input: {
        organisation_id: scenario.organisationOnProject.two.organisation_id,
      },
    })

    expect(result.organisation_id).toEqual(
      scenario.organisationOnProject.two.organisation_id
    )
  })

  scenario('deletes a organisationOnProject', async (scenario) => {
    const original = await deleteOrganisationOnProject({
      id: scenario.organisationOnProject.one.id,
    })

    const result = await organisationOnProject({ id: original.id })

    expect(result).toEqual(null)
  })
})
