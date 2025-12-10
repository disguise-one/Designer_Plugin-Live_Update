<template>
  <div class="subscription-box">
    <button class="remove-button" @click="$emit('remove')" aria-label="Remove">
      <img src="../assets/icons/trash.svg" alt="Remove" width="16" height="16" />
    </button>
    <h3>{{ objectName }} <code>[{{ type }}]</code></h3>
    <ResourceInfo
      v-if="isResource"
      :liveUpdate="liveUpdate"
      :objectName="objectName"
    />
    <table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <PropertySubscription
          v-for="sub in subscriptions"
          :key="sub.property"
          :liveUpdate="liveUpdate"
          :objectName="objectName"
          :property="sub.property"
          :options="sub.options"
          @unsubscribe="unsubscribe"
        />
      </tbody>
    </table>
    <PropertyInput
      :objectName="objectName"
      @subscribe="subscribe"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PropertySubscription from './PropertySubscription.vue';
import ResourceInfo from './ResourceInfo.vue';
import PropertyInput from './PropertyInput.vue';
import type { SubscriptionConfiguration, UseLiveUpdateReturn } from '@disguise-one/vue-liveupdate';
import { useStorage } from '@vueuse/core';
import type { PropertySubscriptionConfig } from '../types';



export default defineComponent({
  components: { PropertySubscription, ResourceInfo, PropertyInput },
  props: {
    liveUpdate: {
      type: Object as () => UseLiveUpdateReturn,
      required: true
    },
    objectName: {
      type: String,
      required: true
    }
  },
  emits: ['remove'],
  setup(props) {
    const storageKey = `disguise-liveupdate-tester-objectsubscription-${props.objectName}`;

    // Handle upgrading old storage format
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
          localStorage.setItem(storageKey, JSON.stringify(
            parsed.map((property: string) => ({ property, options: {} }))
          ));
        }
      } catch (e) {
        localStorage.removeItem(storageKey);
      }
    }
    const subscriptions = useStorage<PropertySubscriptionConfig[]>(storageKey, []);

    const subscribe = ({property, options = {}}: {property: string, options: SubscriptionConfiguration}) => {
      console.log(JSON.stringify({property, options}));
      const p = property.trim();
      if (!subscriptions.value.some(sub => sub.property === p)) {
        subscriptions.value.push({ property: p, options });
      }
    };

    const unsubscribe = (property: string) => {
      subscriptions.value = subscriptions.value.filter(sub => sub.property !== property);
    };

    const { type, isResource } = props.liveUpdate.subscribe(
      props.objectName, {
        type: 'type(object)',
        isResource: 'isinstance(object, Resource)'
      },
      { updateFrequencyMs: 1000 }
    );

    return { subscriptions, type, isResource, subscribe, unsubscribe };
  }
});
</script>

<style scoped>
.subscription-box {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
}
.remove-button {
  position: absolute;
  top: 5px;
  right: 5px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  border: 1px solid #ccc;
  padding: 5px;
  text-align: left;
}
</style>
