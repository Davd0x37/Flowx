import { RouteRecordNormalized } from 'vue-router';

export const getNestedRoutes = (routes: RouteRecordNormalized[]) => {
  const allRoutes = new Map(routes.map((route) => [route.name, route])) as Map<string, RouteRecordNormalized>;

  const getRoutesInternal = (routes: Array<RouteRecordNormalized>) => {
    // Temporary store for routes
    const routesMap = new Map();

    routes.forEach((route) => {
      if (route?.meta?.displayInNav === false) return;

      routesMap.set(route.name, {
        ...allRoutes.get(route.name as string),
        ...route,
      });

      // If route has children components then we iterate over and store them
      // save their names in property 'childrenComponents' for later removal from main 'routesMap' map
      if (route.children?.length > 0) {
        routesMap.set(route.name, {
          ...allRoutes.get(route.name as string),
          children: getRoutesInternal(route.children as RouteRecordNormalized[]),
          childrenComponents: route.children
            ?.filter((child) => child?.meta?.displayInNav !== false)
            ?.map((child) => child.name),
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
