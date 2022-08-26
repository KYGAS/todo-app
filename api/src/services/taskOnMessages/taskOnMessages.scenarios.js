export const standard = defineScenario({
  taskOnMessage: {
    one: {
      data: {
        task: {
          create: {
            name: 'String',
            status: 'String',
            responsible_person_id: 4316474,
          },
        },

        message: { create: { creator_id: 8094973, message: 'String' } },
      },
    },

    two: {
      data: {
        task: {
          create: {
            name: 'String',
            status: 'String',
            responsible_person_id: 7316649,
          },
        },

        message: { create: { creator_id: 1259459, message: 'String' } },
      },
    },
  },
})
