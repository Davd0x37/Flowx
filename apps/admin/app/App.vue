<script setup lang="ts">
import { shallowRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { LAYOUTS, type Layouts } from './layouts';

const route = useRoute();
const router = useRouter();

const metaLayout = route.meta?.layout as Layouts | undefined;
const layoutComponent = typeof metaLayout === 'string' && metaLayout in LAYOUTS ? LAYOUTS[metaLayout] : LAYOUTS.Main;
const layoutRef = shallowRef(layoutComponent);

router.afterEach((to) => {
  const toLayout = to.meta.layout as Layouts | undefined;
  if (typeof toLayout !== 'string' || !(toLayout in LAYOUTS)) return;

  layoutRef.value = LAYOUTS[toLayout];
});
</script>

<template>
  <component :is="layoutRef">
    <router-view />
  </component>
</template>

<style>
@import 'app/assets/base.css';
</style>
