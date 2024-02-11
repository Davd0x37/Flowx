<script setup lang="ts">
import Sidebar from 'app/components/Sidebar/VSidebar.vue';
</script>

<template>
  <div class="flex h-screen w-screen flex-row gap-6 font-sans text-base antialiased transition-colors">
    <Sidebar openSidebar class="flex-1" />

    <div class="flex-1">
      <slot></slot>
    </div>
  </div>
</template>
