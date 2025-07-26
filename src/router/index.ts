import { createRouter, createWebHistory } from "vue-router";

const UrlView = () => import("../views/UrlView.vue");
const RedirectView = () => import("../views/RedirectView.vue");
const routes = [
  {
    path: "/",
    component: UrlView,
  },
  {
    path: "/r/:id",
    component: RedirectView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.name !== from.name) {
      return { top: 0, behavior: "smooth" };
    }

    return {};
  },
});

export default router;
