<template>
  <LiveUpdateOverlay
    :liveUpdate="liveUpdate"
  />
  <div>
    <h1>LiveUpdate Subscriptions</h1>
    <SubscriptionManager :liveUpdate="liveUpdate" />
  </div>
</template>

<script lang="ts">
import { provide } from 'vue';
import { useLiveUpdate, LiveUpdateOverlay } from '@disguise-one/vue-liveupdate';
import SubscriptionManager from './components/SubscriptionManager.vue';
import { liveupdate_tester } from './liveupdate_tester.py';

export default {
  setup() {
    const queryParams = new URLSearchParams(window.location.search);
    const director = queryParams.get('director') ?? window.location.hostname;

    const liveUpdate = useLiveUpdate(director);

    const module = liveupdate_tester(director);

    module.registration.then((reg) => {
      console.log('LiveUpdate module registered', reg);
    }).catch((error) => {
      console.error('Error registering LiveUpdate module:', error);
    });

    provide('autocomplete', module.autocomplete);

    return { liveUpdate };
  },
  components: {
    SubscriptionManager,
    LiveUpdateOverlay
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}
</style>
