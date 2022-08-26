export const standard = defineScenario({
  projectOnTask: {
    one: {
      data: {
        project: { create: { name: 'String' } },
        task: {
          create: {
            name: 'String',
            status: 'String',
            responsible_person_id: 5707661,
          },
        },
      },
    },

    two: {
      data: {
        project: { create: { name: 'String' } },
        task: {
          create: {
            name: 'String',
            status: 'String',
            responsible_person_id: 2826307,
          },
        },
      },
    },
  },
})
