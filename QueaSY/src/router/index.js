import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomeView },
    // { path: "/explore", component: ExploreTanks },
    { path: "/login", component: () => import("../views/LoginView.vue") },
    // {
    //   path: "/my-tank",
    //   component: MyTankView,
    //   meta: { requiresAuth: true },
    // },
    // {
    //   path: "/shop",
    //   component: ShopView,
    //   meta: { requiresAuth: true },
    // },
  ],
});

export default router;

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});
