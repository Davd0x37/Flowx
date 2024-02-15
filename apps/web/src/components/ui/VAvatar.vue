<script setup lang="ts">
import { computed } from 'vue';
import { ref } from 'vue';
import { type VariantProps, cva } from 'class-variance-authority';
import { UserStatus } from 'features/user/types/user';

/**
 * @TODO: decompose status options from avatar component?
 * Define them inside "Avatar" component or keep using from "user" feature?
 * Refactor in free time
 */

const statusClass = cva(
  'overflow-visible block bottom-[5px] right-[5px] size-[12px] rounded-full border-[2px] border-solid border-gray-100',
  {
    variants: {
      status: {
        [UserStatus.available]: 'bg-green-500',
        [UserStatus.idle]: 'bg-yellow-500',
        [UserStatus.doNotDisturb]: 'bg-red-500',
        [UserStatus.invisible]: 'bg-gray-400',
      },
    },
    defaultVariants: {
      status: UserStatus.invisible,
    },
  },
);
type StatusProps = VariantProps<typeof statusClass>;

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

const imgLoaded = ref(false);
const showPlaceholder = computed(() => {
  if (!imgLoaded.value && props.fallback) return true;

  return false;
});

const onImgLoad = (ev: Event) => {
  if (ev?.target instanceof HTMLImageElement) {
    imgLoaded.value = ev.target.complete ?? false;
  }
};

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
