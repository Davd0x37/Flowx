<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { RouteRecordNormalized, RouteRecordRaw } from 'vue-router';
import { VLink } from 'app/components';
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
  <div v-if="childRoutesLength > 0">
    <VSidebarGroup :icon="routeIcon" v-if="routeTitle" :title="t(routeTitle)">
      <VSidebarRoute v-for="[_, item] in route.children?.entries()" :key="item.name" :route="item" />
    </VSidebarGroup>
  </div>

  <VLink
    v-else
    :to="{
      name: route.name,
    }"
    :icon="route?.meta?.icon"
    v-if="routeTitle"
    >{{ t(routeTitle) }}</VLink
  >
</template>
