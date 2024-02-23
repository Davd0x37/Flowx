import type { TUserStatus, UserStore } from '../types/user';

const useUserStore = defineStore('user', () => {
  const userName = ref<UserStore['name']>('Test user');
  const avatar = ref<UserStore['avatar']>('');
  const status = ref<TUserStatus>('offline');

  const changeName = (name: UserStore['name']) => {
    userName.value = name;
  };
  const changeAvatar = (avatarValue: UserStore['avatar']) => {
    avatar.value = avatarValue;
  };
  const changeStatus = (statusValue: TUserStatus) => {
    status.value = statusValue;
  };

  return {
    userName,
    avatar,
    status,
    changeName,
    changeAvatar,
    changeStatus,
  };
});

export { useUserStore };
