<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { RouteRecordNormalized, RouteRecordRaw } from 'vue-router';
import { VButtonLink } from 'app/components';
import VSidebarGroup from './VSidebarGroup.vue';
import VSidebarRoute from './VSidebarRoute.vue';

const { t } = useI18n();

const props = defineProps<{
  route: RouteRecordNormalized | RouteRecordRaw;
}>();

// If children property is Map (returned from 'getNestedRoutes' function) we need to get its size
// if it's just an array we need its length
const childRoutesLength =
  (props.route?.children instanceof Map ? props.route?.children?.size : props.route?.children?.length) || 0;
// Route title taken from 'meta' property or if is nonexistent then from 'name'
const routeTitle = (props.route.meta?.title as string) || (props.route.name as string);
// Same as routeTitle but icon can be an empty value
const routeIcon = (props.route.meta?.icon as string) || '';
</script>

<template>
  <li v-if="routeTitle && childRoutesLength > 0">
    <VSidebarGroup :icon="routeIcon" :title="t(routeTitle)">
      <VSidebarRoute v-for="[_, item] in route.children?.entries()" :key="item.name" :route="item" />
    </VSidebarGroup>
  </li>

  <li v-else>
    <!-- <span class="tooltip tooltip-right" :data-tip="t(routeTitle)"> -->
    <VButtonLink :to="{ name: route.name }" :icon="route?.meta?.icon" v-if="routeTitle">
      <span class="[.--collapsed_&]:hidden">{{ t(routeTitle) }}</span>
    </VButtonLink>
    <!-- </span> -->
  </li>
</template>
