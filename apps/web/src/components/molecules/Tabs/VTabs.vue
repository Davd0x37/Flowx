<template>
  <div>
    <nav
      :class="['flex space-x-6 border-b border-neutral-300 dark:border-neutral-700', { 'justify-center': centered }]"
    >
      <button
        v-for="({ id, name }, idx) in tabs"
        :key="idx"
        type="button"
        :class="[
          'tab tab-bordered tab-lg hover:text-secondary [&.tab-active]:text-secondary [&.tab-active]:!border-secondary text-sm font-semibold',
          { 'tab-active': id === activeTab },
        ]"
        @click="() => setActiveTab(id)"
      >
        {{ name }}
      </button>
    </nav>
    <div class="container mt-4">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, provide } from 'vue';
import { TabsComposable, tabsComposableSymbol, useTabs } from 'app/composables/useTabs';

withDefaults(
  defineProps<{
    centered: boolean;
  }>(),
  {
    centered: false,
  },
);

const linkClass =
  "transition-color transition-background after:content-[''] relative whitespace-nowrap border-b border-transparent p-3 text-sm font-semibold text-neutral-600 transition-colors after:absolute after:-bottom-[2px] after:left-0 after:h-[2px] after:w-full after:rounded after:transition-colors hover:text-secondary after:hover:bg-secondary dark:text-neutral-400 [&.active]:text-secondary [&.active]:after:bg-secondary";

const tabsComposable = useTabs();
const { activateFirstTab, setActiveTab, tabs, activeTab } = tabsComposable;

onMounted(() => {
  activateFirstTab();
});

provide<TabsComposable>(tabsComposableSymbol, tabsComposable);
</script>
