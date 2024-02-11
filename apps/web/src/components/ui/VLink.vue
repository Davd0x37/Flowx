<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';

defineProps<{ to: RouteLocationRaw }>();
</script>

<template>
  <router-link v-slot="{ isActive, isExactActive }" :to="to" exact-active-class="active" class="btn btn-link">
    <span class="text-sm font-medium"><slot :is-active="isActive" :is-exact-active="isExactActive"></slot></span>
  </router-link>
</template>
