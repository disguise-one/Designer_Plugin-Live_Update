<template>
  <tr ref="row">
    <td>{{ property }}</td>
    <td>
      <JsonEditorVue v-model="jsonValue" :mode="Mode.tree" :navigation-bar="false" :main-menu-bar="false" />
    </td>
    <td>
      <button @click="$emit('unsubscribe', property)" aria-label="Unsubscribe">
        <img src="../assets/icons/trash.svg" alt="Unsubscribe" width="16" height="16" />
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, useTemplateRef, ref } from 'vue';
import { useSubscriptionVisibility } from '@disguise-one/vue-liveupdate';
import type { UseLiveUpdateReturn } from '@disguise-one/vue-liveupdate';
import JsonEditorVue from 'json-editor-vue';
import { Mode } from 'vanilla-jsoneditor';

export default defineComponent({
  props: {
    liveUpdate: {
      type: Object as () => UseLiveUpdateReturn,
      required: true
    },
    objectName: {
      type: String,
      required: true
    },
    property: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  components: { JsonEditorVue },
  emits: ['unsubscribe'],
  setup(props) {
    const row = useTemplateRef<HTMLElement>('row');

    console.log(`Subscribing to ${props.objectName}.${props.property} with options:`, props.options);
    const subscription = props.liveUpdate.subscribe(props.objectName,
      { [props.property]: props.property },
      props.options
    );
    useSubscriptionVisibility(row, subscription);

    // v-model expects a ref for two-way binding
    const jsonValue = ref(subscription[props.property]);

    return { jsonValue, Mode };
  }
});
</script>

<style scoped>
td {
  border: 1px solid #ccc;
  padding: 5px;
  text-align: left;
}
td:first-child, td:last-child {
  width: 1%;
}
td:last-child {
  text-align: center;
}
</style>
