<script setup lang="ts">
// import { useI18n } from 'vue-i18n';
import { Icon, IconProps } from '@iconify/vue';

// const { t } = useI18n();

defineProps<{
  icon?: string;
  title: string;
  iconSettings?: Omit<IconProps, 'icon'>;
}>();
</script>

<template>
  <details>
    <summary>
      <!-- <div class="tooltip tooltip-right col-span-2 flex w-full items-center gap-3" :data-tip="t(title)"> -->
      <Icon v-if="icon" :icon="icon" width="24" v-bind="iconSettings" />

      <span class="text-sm font-medium">{{ title }}</span>
      <!-- </div> -->
    </summary>

    <ul class="mt-2 space-y-2">
      <slot></slot>
    </ul>
  </details>
</template>
