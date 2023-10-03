<script setup lang="ts">
import { InputHTMLAttributes, LabelHTMLAttributes, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { Warning } from 'app/assets/icons';
import VInput from './VInput.vue';
import VLabel from './VLabel.vue';

const props = defineProps<{
  htmlFor: NonNullable<LabelHTMLAttributes['for']>;
  inputType: NonNullable<InputHTMLAttributes['type']>;
  showError?: boolean;
  errorIcon?: string;
  errorMessage?: string;
}>();

const errorClass = computed(() => ({ 'border-red-400': props.showError }));
</script>

<template>
  <VLabel :for="htmlFor"><slot /></VLabel>
  <VInput :id="htmlFor" :class="['mt-1.5', errorClass]" :type="inputType" v-bind="$attrs" />

  <div v-if="showError" class="ml-0.5 mt-1 w-full text-sm text-red-400">
    <span class="flex items-center">
      <Icon :icon="errorIcon || Warning" fontSize="1rem" class="mr-1 inline-block" />
      <span>{{ errorMessage }}</span>
    </span>
  </div>
</template>
