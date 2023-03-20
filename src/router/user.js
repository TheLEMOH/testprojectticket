export default [
  {
    path: "/user/create",
    name: "userCreate",
    component: () => import("../views/User/Create.vue"),
    meta: {
      layout: "Standard",
      name: "Создание пользователя",
    },
  },
  {
    path: "/user/:id",
    name: "userEdit",
    component: () => import("../views/User/Edit.vue"),
    meta: {
      layout: "Standard",
      name: "Редактирование пользователя",
    },
  },
  {
    path: "/user/filter",
    name: "userFilter",
    component: () => import("../views/User/Filter.vue"),
    meta: {
      layout: "Standard",
      name: "Фильтрация",
    },
  },
  {
    path: "/registration",
    name: "registration",
    component: () => import("../views/User/Registration.vue"),
    meta: {
      layout: "Center",
      name: "Регистрация",
    },
  },
  {
    path: "/user/all",
    name: "userAll",
    component: () => import("../views/User/Table.vue"),
    meta: {
      layout: "Standard",
      name: "Все пользователи",
    },
  },
];
