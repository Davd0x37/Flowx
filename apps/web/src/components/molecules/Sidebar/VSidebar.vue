<script setup lang="ts">
import { useRouter } from 'vue-router';
import { getNestedRoutes } from 'app/common/routes';
import LinkRoute from './VSidebarRoute.vue';

const router = useRouter();
const routes = getNestedRoutes(router.getRoutes());
</script>

<template>
  <div class="border-e border-e-gray-700 bg-neutral-200 px-5 py-1 shadow-md dark:bg-neutral-900">
    <div class="space-y-2">
      <div v-for="[_, route] of routes" :key="route.name">
        <LinkRoute v-bind="{ route }" />
      </div>
    </div>
  </div>
</template>
