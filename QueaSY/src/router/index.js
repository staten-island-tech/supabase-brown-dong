import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import FrontPageView from "@/views/FrontPageView.vue";
import SignUpView from "@/views/SignUpView.vue";
import FishTankView from "@/views/FishTankView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: FrontPageView },
    { path: "/signuptwin", component: SignUpView },
    { path: "/tank", component: FishTankView, meta: { requiresAuth: true } },
  ],
});

export default router;

// router.beforeEach((to, from, next) => {
//   const auth = useAuthStore();

//   if (to.meta.requiresAuth && !auth.isAuthenticated) {
//     next("/login");
//   } else {
//     next();
//   }
// });
