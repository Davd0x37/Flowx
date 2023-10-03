<script setup lang="ts">
// @FIXME: check why v-bind adds class attribute twice
</script>

<template>
  <button
    class="rounded bg-emerald-600 p-3 text-sm font-medium text-emerald-50 transition hover:bg-emerald-700"
    type="button"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>
