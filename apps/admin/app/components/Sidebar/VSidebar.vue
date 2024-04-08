<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { AVATAR_FALLBACK } from 'app/config/constants';
import { routes } from 'app/router';
import { getAcronyms } from '@flowx/shared/utils/strings';
import { useUserStore } from 'features/user/stores/user';
import VAvatar from 'ui/VAvatar.vue';
import VSidebarRouteList from './VSidebarRouteList.vue';

const userStore = useUserStore();
const { userName, avatar, status } = storeToRefs(userStore);

const { data: acronymData, error: acronymError } = getAcronyms(userName.value ?? '');
// If getAcronyms returns an error it should use the global acronym
const avatarFallback = acronymError ? AVATAR_FALLBACK : acronymData;
</script>

<template>
  <div class="bg-base-200 max-w-xs border-e border-e-gray-700 px-4 py-6 shadow-md">
    <div className="mb-4 flex flex-row items-center gap-3 pl-3 font-semibold">
      <!-- Avatar component -->
      <v-avatar :url="avatar" :fallback="avatarFallback" :status="status" />

      <!-- User name -->
      <p className="text-sm">
        {{ userName }}
      </p>
    </div>

    <!-- All routes that can be displayed in sidebar -->
    <ul class="menu gap-2 pl-0">
      <template v-for="route of routes">
        <v-sidebar-route-list v-if="route.meta?.displayInNav !== false" :key="route.name" v-bind="{ route }" />
      </template>
    </ul>
  </div>
</template>
