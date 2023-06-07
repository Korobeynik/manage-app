import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SignUpViews.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginViews.vue"),
  },
  {
    path: "/add",
    name: "Add",
    component: () => import(/* webpackChunkName: "about" */ "../views/Add.vue"),
  },
  {
    path: "/update/:id",
    name: "Update",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Update.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
