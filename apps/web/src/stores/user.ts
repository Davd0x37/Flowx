import type { UserStatus } from '@flowx/api_types/models/user'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserStore = {
  name: string
  avatar: string
  status: UserStatus

  changeName: (name: UserStore['name']) => void
  changeAvatar: (avatar: UserStore['avatar']) => void
  changeStatus: (status: UserStatus) => void
}

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      name: '',
      avatar: '',
      status: 'offline',

      changeName: (name: UserStore['name']) => {
        set(() => ({ name }))
      },
      changeAvatar: (avatar: UserStore['avatar']) => {
        set(() => ({ avatar }))
      },
      changeStatus: (status: UserStatus) => {
        set(() => ({ status }))
      },
    }),
    {
      name: 'user-storage',
    },
  ),
)

export default useUserStore
