import { ref } from 'vue';

import { defineStore } from 'pinia';

import { UserStatus, UserStore } from '../types/user';

const useUserStore = defineStore('user', () => {
  const userName = ref('Test user');
  const avatar = ref('');
  const status = ref('idle');

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