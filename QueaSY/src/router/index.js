import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import FishTank from "../views/FishTank.vue";
import StorePage from "../views/StorePage.vue";
import SocialPage from "../views/SocialPage.vue";

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
      component: FishTank,
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
  ],
});

export default router;
