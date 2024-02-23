import type { RouteRecordNormalized } from 'vue-router';

export const getNestedRoutes = (routes: RouteRecordNormalized[]) => {
  const allRoutes = new Map(routes.map((route) => [route.name, route])) as Map<string, RouteRecordNormalized>;

  const getRoutesInternal = (routes: Array<RouteRecordNormalized>) => {
    // Temporary store for routes
    const routesMap = new Map();

    routes.forEach((route) => {
      // Don't add route if "displayInNav" is set to false
      if (route?.meta?.displayInNav === false) return;

      // We need string and not symbol/undefined so return as soon as possible
      if (typeof route?.name !== 'string') return;

      // Set temporary routes map with all route properties
      routesMap.set(route.name, {
        ...allRoutes.get(route.name),
        ...route,
      });

      // If route has children components then we iterate over and store them
      // save their names in property 'childrenComponents' for later removal from main 'routesMap' map
      if (route.children?.length > 0) {
        const childrenComponents = route.children
          ?.filter((child) => child?.meta?.displayInNav !== false)
          ?.map((child) => child.name);

        routesMap.set(route.name, {
          ...allRoutes.get(route.name),
          children: getRoutesInternal(route.children as RouteRecordNormalized[]),
          childrenComponents: childrenComponents || [],
        });
      }
    });

    return routesMap;
  };

  const nestedRoutes = getRoutesInternal(routes);

  // After creating nested object with routes
  // we have to remove remaining routes from array root
  // getRoutes - by default returns all routes in one-dimensional array
  nestedRoutes.forEach((route) => {
    route.childrenComponents?.forEach((comp: string) => {
      nestedRoutes.delete(comp);
    });
  });

  return nestedRoutes;
};
