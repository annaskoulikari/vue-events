import EventService from "@/services/EventService.js";

export const namespaced = true;

export const state = {
  events: [],
  event: {},
  eventsTotal: 0
};

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal;
  }
};

export const actions = {
  createEvent({ commit }, event) {
    return EventService.postEvent(event).then(() => commit("ADD_EVENT", event));
  },
  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit("SET_EVENTS_TOTAL", parseInt(response.headers["x-total-count"]));
        commit("SET_EVENTS", response.data);
      })
      .catch(error => {
        console.log("There was an error in fetchEvents" + error.response);
      });
  },
  fetchEvent({ commit, getters }, id) {
    var event = getters.getEventById(id);
    if (event) {
      commit("SET_EVENT", event);
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit("SET_EVENT", response.data);
        })
        .catch(error => {
          console.log("There was an error in fetchEvent" + error);
        });
    }
  }
};

export const getters = {
  catLength: state => {
    return state.categories.length;
  },
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  }
};
