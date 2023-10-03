<template>
  <input
    class="block w-full rounded-md border px-2 py-1.5 text-neutral-900 accent-green-500 placeholder:text-gray-400 sm:text-sm"
    v-bind="$attrs"
    v-on:input="$emit('update:modelValue', $event.target.value)"
  />
</template>
