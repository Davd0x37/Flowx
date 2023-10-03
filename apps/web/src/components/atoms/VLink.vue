<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';
import { Icon, IconProps } from '@iconify/vue';

defineProps<{ icon?: string | unknown; iconSettings?: Omit<IconProps, 'icon'>; to: RouteLocationRaw }>();
</script>

<template>
  <router-link
    :to="to"
    exact-active-class="active"
    class="box-border flex h-10 items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 [&.active]:bg-gray-100 [&.active]:text-gray-700"
    v-slot="{ isActive, isExactActive }"
  >
    <Icon v-if="icon" :icon="icon as string" width="22" v-bind="iconSettings" />

    <span class="text-sm font-medium"><slot :isActive="isActive" :isExactActive="isExactActive"></slot></span>
  </router-link>
</template>
