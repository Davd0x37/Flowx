import {
  ApiRequest,
  UpdateStatusRoute,
  type UpdateStatusRouteRequest,
  type UpdateStatusRouteResponse,
} from '@flowx/api'
import { useMutation } from '@tanstack/react-query'

/**
 * Custom hook to handle user status mutation.
 *
 * @param {Function} [onSuccess] - Optional callback function to be called on successful mutation.
 * @returns Mutation object for user status update.
 */
function useUserStatusMutation(
  onSuccess?: (data: UpdateStatusRouteRequest) => void,
) {
  return useMutation({
    mutationFn: (payload: UpdateStatusRouteRequest) => {
      return ApiRequest<UpdateStatusRouteResponse>({
        endpoint: UpdateStatusRoute.path,
        options: {
          body: payload,
          credentials: 'include',
          method: UpdateStatusRoute.method,
        },
      })
    },

    onSuccess(
      _: UpdateStatusRouteResponse,
      variables: UpdateStatusRouteRequest,
    ) {
      onSuccess?.(variables)
    },
  })
}

export { useUserStatusMutation }
