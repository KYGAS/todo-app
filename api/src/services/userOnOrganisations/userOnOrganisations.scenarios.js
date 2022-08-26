export const standard = defineScenario({
  userOnOrganisation: {
    one: {
      data: {
        user: {
          create: {
            username: 'String4410617',
            email: 'String4852966',
            fName: 'String',
            lName: 'String',
            hashedPassword: 'String',
            salt: 'String',
          },
        },

        organisation: { create: { name: 'String', owner_id: 7556645 } },
      },
    },

    two: {
      data: {
        user: {
          create: {
            username: 'String1623683',
            email: 'String8474049',
            fName: 'String',
            lName: 'String',
            hashedPassword: 'String',
            salt: 'String',
          },
        },

        organisation: { create: { name: 'String', owner_id: 955749 } },
      },
    },
  },
})
