import {
  type UpdateStatusBodyRequest,
  type UpdateStatusErrorResponse,
  type UpdateStatusSuccessResponse,
  updateStatusClientEndpoint,
} from '@flowx/api_types/routes/me/updateStatus'
import { Fetch } from '@flowx/shared/utils/network/fetch'
import { useMutation } from '@tanstack/react-query'
import { getApiEndpoint } from '~/config/api'

// Update status endpoint
const statusEndpoint = getApiEndpoint(updateStatusClientEndpoint())

// Status mutation
export const useUserStatusMutation = (onSuccess?: (data: UpdateStatusBodyRequest) => void) => {
  return useMutation({
    mutationFn: ({ status }: UpdateStatusBodyRequest) => {
      const payload = new URLSearchParams({
        status,
      })

      return Fetch.fetch<UpdateStatusSuccessResponse, UpdateStatusErrorResponse>(statusEndpoint, {
        method: 'PUT',
        credentials: 'include',
        body: payload,
      })
    },

    onSuccess(_, variables) {
      onSuccess?.(variables)
    },
  })
}
