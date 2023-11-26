<script setup lang="ts">
import { computed } from 'vue';

type ButtonType = Pick<HTMLButtonElement, 'type'>['type'];
type Color =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'accent'
  | 'ghost'
  | 'link'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';
type Size = 'xs' | 'sm' | 'lg';
type Corners = 'square' | 'circle';

interface Props {
  type?: ButtonType;
  color?: Color; //| Color[];
  size?: Size;
  corners?: Corners;
  outline?: boolean;
  active?: boolean;
  disabled?: boolean;
  wide?: boolean;
  block?: boolean;
  disableAnimation?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  outline: false,
  active: false,
  disabled: false,
  wide: false,
  block: false,
  disableAnimation: false,
});

// const buttonColor = computed(() => {
//   if (!props.color) return '';
//   const colors = Array.isArray(props.color) ? props.color : [props.color];
//   return colors.map((color) => `btn-${color}`).join(' ');
// });

const buttonClass = computed(() => [
  'btn',
  props.color && `btn-${props.color}`,
  props.size && `btn-${props.size}`,
  props.corners && `btn-${props.corners}`,
  {
    'btn-active': props.active,
    'btn-outline': props.outline,
    'btn-disabled': props.disabled,
    'btn-wide': props.wide,
    'btn-block': props.block,
    'no-animation': props.disableAnimation,
  },
]);
</script>

<template>
  <button :type="type" :class="buttonClass" :disabled="disabled" :aria-disabled="disabled" v-bind="$attrs">
    <slot />
  </button>
</template>
