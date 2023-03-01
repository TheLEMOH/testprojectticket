export default [
  {
    path: "/init",
    name: "init",
    component: () => import("../views/Init/Init.vue"),
    meta: {
      layout: "Init",
      index: 0,
    },
  },
  {
    path: "/init/organization",
    name: "initOrganization",
    component: () => import("../views/Init/Organization.vue"),
    meta: {
      layout: "Init",
      index: 1,
    },
  },
  {
    path: "/init/email",
    name: "initEmail",
    component: () => import("../views/Init/Email.vue"),
    meta: {
      layout: "Init",
      index: 2,
    },
  },
  {
    path: "/init/user",
    name: "initUser",
    component: () => import("../views/Init/User.vue"),
    meta: {
      layout: "Init",
      index: 3,
    },
  },
  {
    path: "/init/end",
    name: "initEnd",
    component: () => import("../views/Init/End.vue"),
    meta: {
      layout: "Init",
      index: 4,
    },
  },
];
