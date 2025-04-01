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
          v-for="property in subscriptions"
          :key="property"
          :liveUpdate="liveUpdate"
          :objectName="objectName"
          :property="property"
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

export default defineComponent({
  components: { PropertySubscription, ResourceInfo, PropertyInput },
  props: {
    liveUpdate: {
      type: Object,
      required: true
    },
    objectName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const subscriptions = ref<string[]>([]);

    const subscribe = (property: string) => {
      const p = property.trim();

      if (!subscriptions.value.includes(p)) {
        subscriptions.value.push(p);
      }
    };

    const unsubscribe = (property: string) => {
      subscriptions.value = subscriptions.value.filter(p => p !== property);
    };

    const { type, isResource } = props.liveUpdate.subscribe(
      props.objectName, {
        type: 'type(object)',
        isResource: 'isinstance(object, Resource)'
      }
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
