<template>
  <div ref="resourceInfo" class="resource-info">
    <p><strong>Description:</strong> {{ description }}</p>
    <p><strong>UID:</strong> {{ uid }}</p>
    <p><strong>Path:</strong> {{ path }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, useTemplateRef } from 'vue';
import type { UseLiveUpdateReturn } from '@disguise-one/vue-liveupdate';
import { useSubscriptionVisibility } from '@disguise-one/vue-liveupdate';

export default defineComponent({
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
  setup(props) {
    const resourceInfo = useTemplateRef<HTMLElement>('resourceInfo');

    const subscription = props.liveUpdate.subscribe(props.objectName,
      {
        description: 'object.description',
        uid: '"0x{:x}".format(object.uid)',
        path: 'str(object.path)'
      },
      { updateFrequencyMs: 1000 }
    );
    useSubscriptionVisibility(resourceInfo, subscription);

    return {
      description: subscription.description,
      uid: subscription.uid,
      path: subscription.path
    };
  }
});
</script>

<style scoped>
.resource-info {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
}
</style>
