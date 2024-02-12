<script setup lang="ts">
import { FunctionalComponent, SVGAttributes } from 'vue';

import { IconProps } from '@iconify/vue';

defineProps<{
  icon?: FunctionalComponent<SVGAttributes>;
  title: string;
  iconSettings?: Omit<IconProps, 'icon'>;
}>();
</script>

<template>
  <details>
    <summary>
      <component :is="icon" v-if="icon" width="24" />
      <span class="text-sm font-medium">{{ title }}</span>
    </summary>

    <ul class="mt-2 space-y-2">
      <slot></slot>
    </ul>
  </details>
</template>

<style scoped>
/* .menu :where(li ul):before {
  display: none;
} */
</style>
