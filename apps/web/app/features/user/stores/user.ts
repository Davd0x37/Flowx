import { create } from 'zustand';
import { TUserStatus, UserStore } from '../types/user';

const useUserStore = create<UserStore>((set) => ({
  name: 'Test User',
  avatar: '',
  status: 'idle',

  changeName: (name: UserStore['name']) => set(() => ({ name })),
  changeAvatar: (avatar: UserStore['avatar']) => set(() => ({ avatar })),
  changeStatus: (status: TUserStatus) => set(() => ({ status })),
}));

export default useUserStore;
