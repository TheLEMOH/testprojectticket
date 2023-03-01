export default [
  {
    path: "/area/create",
    name: "areaCreate",
    component: () => import("../views/Area/Create.vue"),
    meta: {
      layout: "Standard",
      name: "Создание области работ",
    },
  },
  {
    path: "/area/:id",
    name: "areaEdit",
    component: () => import("../views/Area/Edit.vue"),
    meta: {
      layout: "Standard",
      name: "Редактирование области работ",
    },
  },
  {
    path: "/area/all",
    name: "areaAll",
    component: () => import("../views/Area/Table.vue"),
    meta: {
      layout: "Standard",
      name: "Все области работ",
    },
  },
  {
    path: "/area/filter",
    name: "areaFilter",
    component: () => import("../views/Area/Filter.vue"),
    meta: {
      layout: "Standard",
      name: "Фильтрация",
    },
  },
];
