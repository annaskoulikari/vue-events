<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
  </div>
</template>

<script>
import EventCard from "../components/EventCard";
import axios from "axios";

export default {
  components: {
    EventCard
  },
  data() {
    return {
      events: []
    };
  },
  created() {
    axios
      .get("http://localhost:3000/events")
      .then(response => {
        this.events = response.data;
      })
      .catch(error => {
        console.log("There was an error" + error.response);
      });
  }
};
</script>
