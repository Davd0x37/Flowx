<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';

type Props = { icon?: string | unknown; to: RouteLocationRaw };

defineProps<Props>();
</script>

<template>
  <router-link
    v-slot="{ isActive, isExactActive }"
    :to="to"
    exact-active-class="active"
    class="flex items-center gap-3"
  >
    <component :is="icon" v-if="icon" font-size="1.1rem" />

    <span class="text-sm font-medium"><slot :is-active="isActive" :is-exact-active="isExactActive"></slot></span>
  </router-link>
</template>
