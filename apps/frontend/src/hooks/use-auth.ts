import { use } from 'react'
import { AuthContext } from '~/providers/auth-provider'

function useAuth() {
  const context = use(AuthContext)

  if (context === undefined)
    throw new Error('useAuth must be used within a AuthProvider')

  return context
}

export { useAuth }
