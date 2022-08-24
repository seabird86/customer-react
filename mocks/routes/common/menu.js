const MENU_ITEMS = [
  {
    id: 1,
    label: "Management",
    children: [2,3],
  },{
    id:2,
    label: "Customer"
  },{
    id:3,
    label: "System User"
  },
];

module.exports = [
  {
    id: "GET:menu-items",
    url: "/menu-items",
    method: "GET",
    variants: [
      {
        id: "*",
        type: "json",
        options: {
          status: 200,
          headers: {
            "Content-Type":"application/json",
          },
          body: MENU_ITEMS,
        },
      },
    ],
  },
];
