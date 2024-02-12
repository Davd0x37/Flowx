<script setup lang="ts">
import { computed } from 'vue';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from 'app/utils/classNames';

const ButtonSettings = cva('btn', {
  variants: {
    size: {
      xs: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    },
    corners: {
      square: 'btn-square',
      circle: 'btn-circle',
    },
    variant: {
      neutral: 'btn-neutral',
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      accent: 'btn-accent',
      ghost: 'btn-ghost',
      link: 'btn-link',
      info: 'btn-info',
      success: 'btn-success',
      warning: 'btn-warning',
      error: 'btn-error',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type ButtonProps = VariantProps<typeof ButtonSettings>;

type ButtonType = Pick<HTMLButtonElement, 'type'>['type'];

interface Props {
  type?: ButtonType;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  corners?: ButtonProps['corners'];
  active?: boolean;
  outline?: boolean;
  disabled?: boolean;
  wide?: boolean;
  block?: boolean;
  disableAnimation?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: null,
  size: 'md',
  corners: null,
  active: false,
  outline: false,
  disabled: false,
  wide: false,
  block: false,
  disableAnimation: false,
  class: '',
});

const buttonClass = computed(() => [
  ButtonSettings({
    variant: props.variant,
    size: props.size,
    corners: props.corners,
  }),
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
  <button
    :type="type"
    v-bind="$attrs"
    :class="cn(...buttonClass, props.class)"
    :disabled="disabled"
    :aria-disabled="disabled"
  >
    <slot />
  </button>
</template>
