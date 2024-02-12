<script setup lang="ts">
import { FunctionalComponent, SVGAttributes } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouteRecordNormalized, RouteRecordRaw } from 'vue-router';

import VSidebarButtonLink from './VSidebarButtonLink.vue';
import VSidebarRouteList from './VSidebarRouteList.vue';

/**
 * @TODO: refactor current component in free time
 * @FIXME: change default font-size for icons, use ref or standard font size.
 * Maybe move "VSidebarButtonLink" here?
 */

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
const routeIcon = (props.route.meta?.icon as FunctionalComponent<SVGAttributes>) || '';
</script>

<template>
  <li v-if="routeTitle && childRoutesLength > 0">
    <details>
      <summary>
        <component :is="routeIcon" v-if="routeIcon" font-size="1.1rem" />
        <span class="text-sm font-medium">{{ t(routeTitle) }}</span>
      </summary>

      <ul class="mt-2 space-y-2">
        <v-sidebar-route-list v-for="[_, item] in route.children?.entries()" :key="item.name" :route="item" />
      </ul>
    </details>
  </li>

  <li v-else-if="routeTitle">
    <v-sidebar-button-link :to="{ name: route.name }" :icon="route?.meta?.icon">
      <span class="[.--collapsed_&]:hidden">{{ t(routeTitle) }}</span>
    </v-sidebar-button-link>
  </li>
</template>

<style scoped>
/* .menu :where(li ul):before {
  display: none;
} */
</style>
