<script setup lang="ts">
import { useRouter } from 'vue-router';
import { getNestedRoutes } from 'app/common/routes';
import LinkRoute from './VSidebarRoute.vue';

const router = useRouter();
const routes = getNestedRoutes(router.getRoutes());
</script>

<template>
  <div class="bg-base-200 max-w-xs border-e border-e-gray-700 px-5 py-1 shadow-md">
    <ul class="menu gap-2">
      <LinkRoute v-for="[_, route] of routes" :key="route.name" v-bind="{ route }" />
    </ul>
  </div>
</template>

<style scoped>
.menu :where(li ul):before {
  display: none;
}
</style>
