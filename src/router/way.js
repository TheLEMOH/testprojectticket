export default [
  {
    path: "/way/create",
    name: "wayCreate",
    component: () => import("../views/Way/Create.vue"),
    meta: {
      layout: "Standard",
      name: "Создание пути выполнения",
    },
  },
  {
    path: "/way/:id",
    name: "wayEdit",
    component: () => import("../views/Way/Edit.vue"),
    meta: {
      layout: "Standard",
      name: "Редактирование пути выполнения",
    },
  },
  {
    path: "/way/filter",
    name: "wayFilter",
    component: () => import("../views/Way/Filter.vue"),
    meta: {
      layout: "Standard",
      name: "Фильтрация",
    },
  },
  {
    path: "/way/all",
    name: "wayAll",
    component: () => import("../views/Way/Table.vue"),
    meta: {
      layout: "Standard",
      name: "Пути выполнения",
    },
  },
];
