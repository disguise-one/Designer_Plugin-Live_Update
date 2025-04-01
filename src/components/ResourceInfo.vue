<template>
  <div class="resource-info">
    <p><strong>Description:</strong> {{ description }}</p>
    <p><strong>UID:</strong> {{ uid }}</p>
    <p><strong>Path:</strong> {{ path }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
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
    const description = ref('');
    const uid = ref('');
    const path = ref('');

    onMounted(() => {
      const subscription = props.liveUpdate.subscribe(props.objectName, {
        description: 'object.description',
        uid: '"0x{:x}".format(object.uid)',
        path: 'str(object.path)'
      });

      description.value = subscription.description;
      uid.value = subscription.uid;
      path.value = subscription.path;
    });

    return { description, uid, path };
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
