import type { FeatureRouteProps } from '~/types/route'

/**
 * Retrieves the routes that have the "showInSidebar" property set to true
 *
 * @param {FeatureRouteProps[]} routes - An array of FeatureRouteProps representing the routes
 * @returns {FeatureRouteProps[]} An array of FeatureRouteProps containing the selected routes
 */
export const getRoutes = (routes: FeatureRouteProps[]) => {
  const getRoutes$internal = (routes$: FeatureRouteProps[]): FeatureRouteProps[] => {
    return routes$
      .flatMap((route): unknown => {
        if (route.children) {
          const parsedChildren = getRoutes$internal(route.children)

          if (parsedChildren.length > 0) {
            return [{ ...route, children: parsedChildren }]
          }
        }

        if (route.meta?.showInSidebar) {
          return [{ ...route, children: undefined }]
        }

        return null
      })
      .filter((route) => route !== null) as FeatureRouteProps[]
  }

  return getRoutes$internal(routes)
}
