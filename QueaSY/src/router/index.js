import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

import HomePage from "@/views/HomePage.vue";
import FishTank from "@/views/FishTank.vue";
import StorePage from "@/views/StorePage.vue";
import SocialPage from "@/views/SocialPage.vue";
import HigherLower from "@/views/HigherLower.vue";
import SignUpView from "@/views/SignUpView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "Home Page", component: HomePage },
    { path: "/signup", name: "Sign Up", component: SignUpView },
    {
      path: "/tank",
      name: "Fish Tank",
      component: FishTank,
      meta: { requiresAuth: true },
    },
    {
      path: "/store",
      name: "Store",
      component: StorePage,
    },
    {
      path: "/social",
      name: "Social",
      component: SocialPage,
    },
    {
      path: "/HL",
      name: "HLGame",
      component: HigherLower,
    },
  ],
});

export default router;

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.user) {
    next("/");
    alert("you not logged in");
  } else {
    next();
  }
});
