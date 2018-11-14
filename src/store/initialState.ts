export default {
  organisation: {
    appliances: [
      {
        id: 1,
        name: "My first appliance",
        maintainers: [1, 2],
      },
    ],
    id: 1,
    maintainers: [
      {
        id: 1,
        first: "Paavo",
        last: "Lipponen",
        appliances: [1],
      },
    ],
  },
  user: {
    email: "petri.vuorimaa@aalto.fi",
    first: "Petri",
    last: "Vuorimaa",
    organisations: [
      {
        id: 1,
        roles: ["user", "admin"],
      },
    ],
  },
  views: {
    appliances: {
      activeTab: "listing",
      tabs: {
        listing: {
          activeDrawer: "summary",
          label: "Appliance list",
          sticky: true,
          type: "list",
          props: {},
        },
        // 1: { // Appliance id
        //   activeDrawer: "summary",
        //   label: "My first appliance",
        //   sticky: false,
        //   type: "details",
        //   props: {
        //     unsaved: true,
        //   },
        // },
        new: {
          activeDrawer: "summary",
          label: "New appliance",
          sticky: true,
          type: "new",
          props: {
            unsaved: false,
          },
        },
      },
    },
    maintainers: {
      activeTab: "listing",
      tabs: {
        listing: {
          activeDrawer: "summary",
          label: "Maintainer list",
          sticky: true,
          type: "list",
          props: {},
        },
      },
    },
  },
};
