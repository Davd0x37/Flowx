<script setup lang="ts">
import { computed, ref } from 'vue';
import { type VariantProps, cva } from 'class-variance-authority';
import { UserStatus } from 'features/user/types/user';

/**
 * @TODO: decompose status options from avatar component?
 * Define them inside "Avatar" component or keep using from "user" feature?
 * Refactor in free time
 */

const statusClass = cva(
  'overflow-visible block bottom-[5px] right-[5px] size-[8px] rounded-full ring-2 ring-gray-100',
  {
    variants: {
      status: {
        [UserStatus.active]: 'bg-green-500',
        [UserStatus.idle]: 'bg-yellow-500',
        [UserStatus.doNotDisturb]: 'bg-red-500',
        [UserStatus.offline]: 'bg-gray-400',
      },
    },
    defaultVariants: {
      status: UserStatus.offline,
    },
  },
);
type StatusProps = VariantProps<typeof statusClass>;

/*
 * 'url' of the image to be displayed
 * 'fallback' text to be displayed if image is not loaded
 * 'status' of the user
 */
type Props = {
  url?: string;
  fallback?: string;
  status?: StatusProps['status'];
};

const props = withDefaults(defineProps<Props>(), {
  url: '',
  fallback: '',
  status: undefined,
});

// We need to use ref to track image load status
const imgLoaded = ref(false);
// If image is not loaded and fallback is provided, show placeholder
const showPlaceholder = computed(() => {
  if (!imgLoaded.value && props.fallback) return true;

  return false;
});

const onImgLoad = (ev: Event) => {
  if (ev?.target instanceof HTMLImageElement) {
    imgLoaded.value = ev.target.complete ?? false;
  }
};

// Status indicator class - must be computed otherwise it will not update
const statusIndicator = computed(() => {
  return ['indicator-item indicator-bottom', statusClass({ status: props.status })];
});
</script>

<template>
  <div class="indicator">
    <span :class="statusIndicator" />

    <div :class="['avatar', { placeholder: showPlaceholder }]">
      <div :class="['size-10 rounded-full text-white', { 'bg-gray-500': showPlaceholder }]">
        <img v-if="url" v-show="imgLoaded" :src="url" @load="onImgLoad" />

        <div v-show="showPlaceholder">
          {{ fallback }}
        </div>
      </div>
    </div>
  </div>
</template>
