<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    url?: string;
    placeholder?: boolean;
  }>(),
  {
    title: 'Avatar',
    placeholder: true,
  },
);
</script>

<template>
  <div class="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-green-300 shadow-md"></div>
</template>
