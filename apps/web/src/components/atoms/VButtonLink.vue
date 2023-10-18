<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';
import { Icon, IconProps } from '@iconify/vue';

defineProps<{ icon?: string | unknown; iconSettings?: Omit<IconProps, 'icon'>; to: RouteLocationRaw }>();
</script>

<template>
  <router-link
    :to="to"
    exact-active-class="active"
    v-slot="{ isActive, isExactActive }"
    class="flex items-center gap-3"
  >
    <Icon v-if="icon" :icon="icon as string" width="22" v-bind="iconSettings" />

    <span class="text-sm font-medium"><slot :isActive="isActive" :isExactActive="isExactActive"></slot></span>
  </router-link>
</template>
