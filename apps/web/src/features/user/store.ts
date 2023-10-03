import { ref } from 'vue';
import { defineStore } from 'pinia';

const useUserStore = defineStore('user', () => {
  const userName = ref('asd');

  function changeUserName(name: string) {
    userName.value = name;
  }

  return {
    userName,
    changeUserName,
  };
});

export { useUserStore };
