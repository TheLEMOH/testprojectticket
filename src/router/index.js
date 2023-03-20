import { createRouter, createWebHistory } from "vue-router";

import jwt_decode from "jwt-decode";

import area from "./area";
import category from "./category";
import organization from "./organization";
import ticket from "./ticket";
import user from "./user";
import way from "./way";
import priorities from "./priorities";
import status from "./status";
import system from "./system";
import folder from "./folder";
import init from "./init";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
    meta: {
      layout: "Standard",
      name: "Домашняя страница",
    },
  },
  {
    path: "/statistic",
    name: "statistic",
    component: () => import("../views/Statistic.vue"),
    meta: {
      layout: "Standard",
      name: "Статистика заявок",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login/Login.vue"),
    meta: {
      layout: "Center",
    },
  },

  { path: "/:pathMatch(.*)*", name: "404", component: () => import("../views/Page404.vue"), meta: { layout: "Center" } },

  ...area,
  ...category,
  ...organization,
  ...ticket,
  ...user,
  ...way,
  ...priorities,
  ...status,
  ...system,
  ...folder,
  ...init,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const localToken = localStorage.getItem("TOKEN_TICKET_SYSTEM");

  if (to.name == "registration" || to.name.includes("init")) {
    next();
  } else if (to.name != "login" && !localToken) {
    next({ name: "login" });
  } else {
    /* if (localToken) {
      const decoded = jwt_decode(localToken);
      const role = decoded.role;
    } */
    next();
  }
});

export default router;
