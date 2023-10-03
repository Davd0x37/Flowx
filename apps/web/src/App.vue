<script setup lang="ts">
import { VSidebar } from 'app/components';

// import { getFeature, getFeatures } from './common/features';

// console.log(getFeature('user'));
</script>

<template>
  <div
    class="flex h-screen w-screen flex-row gap-6 bg-zinc-100 font-sans text-base text-neutral-900 antialiased transition-colors dark:bg-zinc-900 dark:text-neutral-100"
  >
    <v-sidebar class="col-span-2 max-w-xs flex-1" />

    <div class="flex-1">
      <router-view></router-view>
    </div>
  </div>
</template>
