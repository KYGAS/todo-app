import {
  projectOnTasks,
  projectOnTask,
  createProjectOnTask,
  updateProjectOnTask,
  deleteProjectOnTask,
} from './projectOnTasks'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('projectOnTasks', () => {
  scenario('returns all projectOnTasks', async (scenario) => {
    const result = await projectOnTasks()

    expect(result.length).toEqual(Object.keys(scenario.projectOnTask).length)
  })

  scenario('returns a single projectOnTask', async (scenario) => {
    const result = await projectOnTask({ id: scenario.projectOnTask.one.id })

    expect(result).toEqual(scenario.projectOnTask.one)
  })

  scenario('creates a projectOnTask', async (scenario) => {
    const result = await createProjectOnTask({
      input: {
        project_id: scenario.projectOnTask.two.project_id,
        task_id: scenario.projectOnTask.two.task_id,
      },
    })

    expect(result.project_id).toEqual(scenario.projectOnTask.two.project_id)
    expect(result.task_id).toEqual(scenario.projectOnTask.two.task_id)
  })

  scenario('updates a projectOnTask', async (scenario) => {
    const original = await projectOnTask({ id: scenario.projectOnTask.one.id })
    const result = await updateProjectOnTask({
      id: original.id,
      input: { project_id: scenario.projectOnTask.two.project_id },
    })

    expect(result.project_id).toEqual(scenario.projectOnTask.two.project_id)
  })

  scenario('deletes a projectOnTask', async (scenario) => {
    const original = await deleteProjectOnTask({
      id: scenario.projectOnTask.one.id,
    })

    const result = await projectOnTask({ id: original.id })

    expect(result).toEqual(null)
  })
})
