import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    _theme: 'dark',
  }),
  getters: {
    theme(state) {
      return state._theme;
    },
  },
  actions: {
    changeTheme(val: string) {
      this._theme = val;
    },
  },
});
