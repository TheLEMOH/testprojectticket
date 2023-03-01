export default [
  {
    path: "/folder/create",
    name: "folderCreate",
    component: () => import("../views/Folder/Create.vue"),
    meta: {
      layout: "Standard",
      name: "Создание папки",
    },
  },
  {
    path: "/folder/:id",
    name: "folderEdit",
    component: () => import("../views/Folder/Edit.vue"),
    meta: {
      layout: "Standard",
      name: "Редактирование папки",
    },
  },
  {
    path: "/folder/all",
    name: "folderAll",
    component: () => import("../views/Folder/Table.vue"),
    meta: {
      layout: "Standard",
      name: "Все папки",
    },
  },
];
