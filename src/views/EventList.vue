<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
  </div>
</template>

<script>
import EventCard from "../components/EventCard.vue";
import { mapState } from "vuex";

export default {
  components: {
    EventCard
  },
  created() {
    this.$store.dispatch("fetchEvents", {
      perPage: 3,
      page: this.page
    });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    ...mapState(["events"])
  }
};
</script>
