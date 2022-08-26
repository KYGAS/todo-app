import {
  taskOnMessages,
  taskOnMessage,
  createTaskOnMessage,
  updateTaskOnMessage,
  deleteTaskOnMessage,
} from './taskOnMessages'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('taskOnMessages', () => {
  scenario('returns all taskOnMessages', async (scenario) => {
    const result = await taskOnMessages()

    expect(result.length).toEqual(Object.keys(scenario.taskOnMessage).length)
  })

  scenario('returns a single taskOnMessage', async (scenario) => {
    const result = await taskOnMessage({ id: scenario.taskOnMessage.one.id })

    expect(result).toEqual(scenario.taskOnMessage.one)
  })

  scenario('creates a taskOnMessage', async (scenario) => {
    const result = await createTaskOnMessage({
      input: {
        task_id: scenario.taskOnMessage.two.task_id,
        message_id: scenario.taskOnMessage.two.message_id,
      },
    })

    expect(result.task_id).toEqual(scenario.taskOnMessage.two.task_id)
    expect(result.message_id).toEqual(scenario.taskOnMessage.two.message_id)
  })

  scenario('updates a taskOnMessage', async (scenario) => {
    const original = await taskOnMessage({ id: scenario.taskOnMessage.one.id })
    const result = await updateTaskOnMessage({
      id: original.id,
      input: { task_id: scenario.taskOnMessage.two.task_id },
    })

    expect(result.task_id).toEqual(scenario.taskOnMessage.two.task_id)
  })

  scenario('deletes a taskOnMessage', async (scenario) => {
    const original = await deleteTaskOnMessage({
      id: scenario.taskOnMessage.one.id,
    })

    const result = await taskOnMessage({ id: original.id })

    expect(result).toEqual(null)
  })
})
