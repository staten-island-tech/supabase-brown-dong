import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import { callWithAsyncErrorHandling } from "vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomePage,
    },
    {
      path: "/tank",
      name: "Fish Tank",
      component: () => import("../views/FishTank.vue"),
    },
    {},
  ],
});

export default router;
