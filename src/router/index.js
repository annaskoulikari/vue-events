import Vue from "vue";
import VueRouter from "vue-router";
import EventCreate from "../views/EventCreate.vue";
import EventShow from "../views/EventShow.vue";
import EventList from "../views/EventList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Event-list",
    component: EventList
  },
  {
    path: "/event/:id",
    name: "Event-show",
    component: EventShow,
    props: true
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

export default router;
