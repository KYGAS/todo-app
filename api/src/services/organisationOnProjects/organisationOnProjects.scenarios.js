export const standard = defineScenario({
  organisationOnProject: {
    one: {
      data: {
        organisation: { create: { name: 'String', owner_id: 3486796 } },
        project: { create: { name: 'String' } },
      },
    },

    two: {
      data: {
        organisation: { create: { name: 'String', owner_id: 9615212 } },
        project: { create: { name: 'String' } },
      },
    },
  },
})
