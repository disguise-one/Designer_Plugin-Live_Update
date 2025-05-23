<template>
  <div>
    <input
      type="text"
      v-model="inputValue"
      placeholder="Enter property to subscribe"
      @keyup.enter="emitSubscribe"
      @keydown.tab.prevent="completeSuggestion"
      :list="autocompleteListId"
    />
    <datalist :id="autocompleteListId">
      <option
        v-for="suggestion in suggestions"
        :key="suggestion"
        :value="suggestion"
      />
    </datalist>
    <button @click="emitSubscribe" style="margin-left: 10px;">Subscribe</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import { watchDebounced } from '@vueuse/core';
import { autocompleteFunction } from '../liveupdate_tester.py';

export default defineComponent({
  props: {
    objectName: {
      type: String,
      required: true
    }
  },
  emits: ['subscribe'],
  setup(props, { emit }) {
    const inputValue = ref('');
    const suggestions = ref<string[]>([]);
    const autocompleteListId = 'autocomplete-list';

    // Access the global autocomplete provided by the app.
    const autocomplete = inject<autocompleteFunction>('autocomplete');
    if (!autocomplete) {
      throw new Error('autocomplete function not provided');
    }

    const emitSubscribe = () => {
      const property = inputValue.value.trim();
      if (property) {
        emit('subscribe', property);
        inputValue.value = '';
      }
    };

    const completeSuggestion = () => {
      const datalist = document.getElementById(autocompleteListId) as HTMLDataListElement | null;
      if (datalist) {
        const activeOption = Array.from(datalist.options).find(option => option.value === inputValue.value);
        if (activeOption) {
          inputValue.value = activeOption.value;
        } else if (suggestions.value.length > 0) {
          inputValue.value = suggestions.value[0];
        }
      }
    };

    watchDebounced(inputValue, async (newValue) => {
      if (newValue.trim()) {
        const result = await autocomplete(props.objectName, newValue.trim());
        suggestions.value = JSON.parse(result.returnValue) || [];
      } else {
        suggestions.value = [];
      }
    }, {
      debounce: 250
    });

    return { inputValue, emitSubscribe, suggestions, autocompleteListId, completeSuggestion };
  }
});
</script>
