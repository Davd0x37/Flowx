import { ref } from 'vue';

import { defineStore } from 'pinia';

import { UserStatus, UserStore } from '../types/user';

const useUserStore = defineStore('user', () => {
  const userName = ref<UserStore['name']>('Test user');
  const avatar = ref<UserStore['avatar']>('');
  const status = ref<UserStatus>('invisible');

  const changeName = (name: UserStore['name']) => {
    userName.value = name;
  };
  const changeAvatar = (avatarValue: UserStore['avatar']) => {
    avatar.value = avatarValue;
  };
  const changeStatus = (statusValue: UserStatus) => {
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
