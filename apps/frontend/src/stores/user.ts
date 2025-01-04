import type { UserStatus } from '@flowx/api'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserStore {
  avatar: string
  changeAvatar: (avatar: UserStore['avatar']) => void
  changeName: (name: UserStore['name']) => void

  changeStatus: (status: UserStatus) => void
  name: string
  status: UserStatus
}

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      avatar: '',
      changeAvatar: (avatar: UserStore['avatar']) => {
        set(() => ({ avatar }))
      },
      changeName: (name: UserStore['name']) => {
        set(() => ({ name }))
      },

      changeStatus: (status: UserStatus) => {
        set(() => ({ status }))
      },
      name: '',
      status: 'OFFLINE',
    }),
    {
      name: 'user-storage',
    },
  ),
)

export default useUserStore
