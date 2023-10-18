<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { VSidebar } from 'app/components';

// @TODO: Move logic to separate layout component
const route = useRoute();
const disableSidebar = computed(() => route.meta?.disableSidebar);
</script>

<template>
  <div class="flex h-screen w-screen flex-row gap-6 font-sans text-base antialiased transition-colors">
    <v-sidebar class="flex-1" v-if="!disableSidebar" />

    <div class="flex-1">
      <router-view></router-view>
    </div>
  </div>
</template>
