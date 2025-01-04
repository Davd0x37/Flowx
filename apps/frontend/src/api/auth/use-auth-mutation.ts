import type {
  LoginRouteRequest,
  LoginRouteResponse,
  LogoutRouteResponse,
  RegisterRouteRequest,
  RegisterRouteResponse,
} from '@flowx/api'
import { ApiRequest, LoginRoute, LogoutRoute, RegisterRoute } from '@flowx/api'
import { encodeRequestBody } from '@flowx/utils'
import { useMutation } from '@tanstack/react-query'

/**
 * Custom hook to handle user login mutation.
 *
 * @returns Mutation object for user login.
 */
function useAuthLoginMutation() {
  return useMutation({
    mutationFn: (data: LoginRouteRequest) => {
      const encodedBody = encodeRequestBody(data)

      return ApiRequest<LoginRouteResponse>({
        endpoint: LoginRoute.path,
        options: {
          body: encodedBody,
          credentials: 'include',
          method: LoginRoute.method,
        },
      })
    },
  })
}

/**
 * Custom hook to handle user logout mutation.
 *
 * @returns Mutation object for user logout.
 */
function useAuthLogoutMutation() {
  return useMutation({
    mutationFn: () => {
      return ApiRequest<LogoutRouteResponse>({
        endpoint: LogoutRoute.path,
        options: {
          credentials: 'include',
          method: LogoutRoute.method,
        },
      })
    },
  })
}

/**
 * Custom hook to handle user registration mutation.
 *
 * @returns Mutation object for user registration.
 */
function useAuthRegisterMutation() {
  return useMutation({
    mutationFn: (data: RegisterRouteRequest) => {
      const encodedBody = encodeRequestBody(data)

      return ApiRequest<RegisterRouteResponse>({
        endpoint: RegisterRoute.path,
        options: {
          body: encodedBody,
          credentials: 'include',
          method: RegisterRoute.method,
        },
      })
    },
  })
}

export { useAuthLoginMutation, useAuthLogoutMutation, useAuthRegisterMutation }
