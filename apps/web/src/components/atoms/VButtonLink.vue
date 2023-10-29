<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';
import { Icon, IconProps } from '@iconify/vue';

defineProps<{ icon?: string | unknown; iconSettings?: Omit<IconProps, 'icon'>; to: RouteLocationRaw }>();
</script>

<template>
  <router-link
    v-slot="{ isActive, isExactActive }"
    :to="to"
    exact-active-class="active"
    class="flex items-center gap-3"
  >
    <Icon v-if="icon" :icon="icon as string" width="22" v-bind="iconSettings" />

    <span class="text-sm font-medium"><slot :is-active="isActive" :is-exact-active="isExactActive"></slot></span>
  </router-link>
</template>
