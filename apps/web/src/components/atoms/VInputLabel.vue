<script setup lang="ts">
import { InputHTMLAttributes, LabelHTMLAttributes, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { Warning } from 'app/assets/icons';

const props = defineProps<{
  label: string;
  labelTopRight?: string;
  labelBottomRight?: string;
  id: NonNullable<LabelHTMLAttributes['id']>;
  inputType: NonNullable<InputHTMLAttributes['type']>;
  showError?: boolean;
  errorIcon?: string;
  errorMessage?: string;
}>();

const errorClass = computed(() => ({ 'input-error': props.showError }));
</script>

<template>
  <div class="form-control">
    <label class="label" :for="id">
      <span class="label-text">{{ label }}</span>
      <span v-if="labelTopRight" class="label-text">{{ labelTopRight }}</span>
    </label>

    <input
      :id="id"
      :class="['input input-bordered w-full', errorClass]"
      :type="inputType"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <label class="label" v-if="showError">
      <span class="label-text-alt text-error">
        <Icon :icon="errorIcon || Warning" fontSize="1rem" class="mr-1 inline-block" />
        <span>{{ errorMessage }}</span>
      </span>

      <span v-if="labelBottomRight" class="label-text-alt">{{ labelBottomRight }}</span>
    </label>
  </div>
</template>
