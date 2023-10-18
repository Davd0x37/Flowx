<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';

defineProps<{ to: RouteLocationRaw }>();
</script>

<template>
  <router-link :to="to" exact-active-class="active" class="btn btn-link" v-slot="{ isActive, isExactActive }">
    <span class="text-sm font-medium"><slot :isActive="isActive" :isExactActive="isExactActive"></slot></span>
  </router-link>
</template>
