import Vue from "vue";
import VueRouter from "vue-router";
import EventCreate from "../views/EventCreate.vue";
import EventShow from "../views/EventShow.vue";
import EventList from "../views/EventList.vue";
import Nprogress from "nprogress";
import store from "@/store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Event-list",
    component: EventList,
    props: true
  },
  {
    path: "/event/:id",
    name: "Event-show",
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch("event/fetchEvent", routeTo.params.id).then(event => {
        routeTo.params.event = event;
        next();
      });
    }
  },
  {
    path: "/event/create",
    name: "Event-create",
    component: EventCreate
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((routeTo, routeFrom, next) => {
  Nprogress.start();
  next();
});

router.afterEach(() => {
  Nprogress.done();
});

export default router;
