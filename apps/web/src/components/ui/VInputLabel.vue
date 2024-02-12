<script setup lang="ts">
import { FunctionalComponent, InputHTMLAttributes, LabelHTMLAttributes, SVGAttributes, computed } from 'vue';
import { type VariantProps, cva } from 'class-variance-authority';
import { Warning } from 'app/assets/icons';
import { cn } from 'app/utils/classNames';

const model = defineModel<unknown>();

const InputSettings = cva('input', {
  variants: {
    size: {
      xs: 'input-xs',
      sm: 'input-sm',
      md: 'input-md',
      lg: 'input-lg',
    },
    variant: {
      neutral: 'input-neutral',
      primary: 'input-primary',
      secondary: 'input-secondary',
      accent: 'input-accent',
      ghost: 'input-ghost',
      link: 'input-link',
      info: 'input-info',
      success: 'input-success',
      warning: 'input-warning',
      error: 'input-error',
    },
  },
});

type InputProps = VariantProps<typeof InputSettings>;

type Props = {
  variant?: InputProps['variant'];
  size?: InputProps['size'];
  label: string;
  labelTopRight?: string;
  labelBottomRight?: string;
  id: NonNullable<LabelHTMLAttributes['id']>;
  type: NonNullable<InputHTMLAttributes['type']>;
  showError?: boolean;
  errorIcon?: FunctionalComponent<SVGAttributes>;
  errorMessage?: string;
  disabled?: boolean;
  bordered?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  variant: null,
  size: null,
  labelTopRight: undefined,
  labelBottomRight: undefined,
  bordered: true,
  errorIcon: undefined,
  errorMessage: undefined,
});

const inputClass = computed(() => [
  InputSettings({
    variant: props.variant,
    size: props.size,
  }),
  {
    'input-error': props.showError,
    'input-bordered': props.bordered,
  },
]);
</script>

<template>
  <div class="form-control">
    <label class="label" :for="id">
      <span class="label-text">{{ label }}</span>
      <span v-if="labelTopRight" class="label-text">{{ labelTopRight }}</span>
    </label>

    <input
      :id="id"
      v-bind="$attrs"
      v-model="model"
      :class="cn(...inputClass)"
      :type="type"
      :disabled="disabled"
      :aria-disabled="disabled"
    />

    <label v-if="showError" class="label">
      <span class="label-text-alt text-error">
        <component :is="errorIcon || Warning" font-size="1rem" class="mr-1 inline-block" />
        <span>{{ errorMessage }}</span>
      </span>

      <span v-if="labelBottomRight" class="label-text-alt">{{ labelBottomRight }}</span>
    </label>
  </div>
</template>
