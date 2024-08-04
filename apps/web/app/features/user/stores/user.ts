import { create } from 'zustand';

export const UserStatus = {
  active: 'active',
  idle: 'idle',
  doNotDisturb: 'doNotDisturb',
  offline: 'offline',
} as const;

export type TUserStatus = keyof typeof UserStatus;

export type UserStore = {
  name: string;
  avatar: string;
  status: TUserStatus;

  changeName: (name: UserStore['name']) => void;
  changeAvatar: (avatar: UserStore['avatar']) => void;
  changeStatus: (status: TUserStatus) => void;
};

const useUserStore = create<UserStore>((set) => ({
  name: '',
  avatar: '',
  status: UserStatus.offline,

  changeName: (name: UserStore['name']) => {
    set(() => ({ name }));
  },
  changeAvatar: (avatar: UserStore['avatar']) => {
    set(() => ({ avatar }));
  },
  changeStatus: (status: TUserStatus) => {
    set(() => ({ status }));
  },
}));

export default useUserStore;
