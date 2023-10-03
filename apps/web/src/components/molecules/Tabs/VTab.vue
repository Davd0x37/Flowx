<template>
  <div :id="computedId" v-if="isActiveTab">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted } from 'vue';
import { tabsComposableSymbol } from 'app/composables/useTabs';

const props = withDefaults(
  defineProps<{
    name: string;
  }>(),
  {
    name: 'NewTab',
  },
);

// Reference to useTabs composable from parent (VTabs)
const tabsComposable = inject(tabsComposableSymbol);
const computedId = computed(() => props.name);

const isActiveTab = computed(() => {
  return tabsComposable?.activeTab?.value == computedId.value;
});

onMounted(() => {
  tabsComposable?.addTab({
    name: props.name,
    id: computedId.value,
  });
});
</script>
