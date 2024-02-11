<script setup lang="ts">
import { routes } from 'app/router';

import LinkRoute from './VSidebarRoute.vue';
</script>

<template>
  <div class="bg-base-200 max-w-xs border-e border-e-gray-700 px-5 py-1 shadow-md">
    <ul class="menu gap-2">
      <template v-for="route of routes">
        <LinkRoute v-if="route.meta?.displayInNav !== false" :key="route.name" v-bind="{ route }" />
      </template>
    </ul>
  </div>
</template>
