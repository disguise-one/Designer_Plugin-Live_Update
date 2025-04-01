<template>
  <div>
    <div>
      <label for="objectName">Object Name:</label>
      <input id="objectName" v-model="objectName" type="text" @keyup.enter="addObject" />
      <button @click="addObject" style="margin-left: 10px;">Add</button>
    </div>

    <div v-for="objectName in objects" :key="objectName">
      <ObjectSubscription
        :liveUpdate="liveUpdate"
        :objectName="objectName"
        @remove="() => removeObject(objectName)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ObjectSubscription from './ObjectSubscription.vue';

export default defineComponent({
  props: {
    liveUpdate: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const objectName = ref('screen2:surface_1');
    const objects = ref<string[]>([]);

    const addObject = () => {
      if (objects.value.includes(objectName.value)) {
        alert('Object already added.');
        return;
      }
      objects.value.push(objectName.value);
    };

    const removeObject = (objectName: string) => {
      objects.value = objects.value.filter(obj => obj !== objectName);
    };

    return { objectName, objects, liveUpdate: props.liveUpdate, addObject, removeObject };
  },
  components: {
    ObjectSubscription
  }
});
</script>

<style scoped>
div {
  margin-bottom: 10px;
}
label {
  margin-right: 10px;
}
</style>
