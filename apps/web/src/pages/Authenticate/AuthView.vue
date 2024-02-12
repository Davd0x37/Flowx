<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { UserInterface, UserRegisterInterface } from '@flowx/shared';

import { LoginForm, RegisterForm } from 'features/auth/components';

const { t } = useI18n();

const loginMode = ref(true);
const authenticationModeTitle = computed(() => (loginMode.value ? t('auth.login') : t('auth.register')));

const handleLogin = (ev: UserInterface) => {
  console.log(ev);
};

const handleRegister = (ev: UserRegisterInterface) => {
  console.log(ev);
};

const toggleMode = () => {
  loginMode.value = !loginMode.value;
};
</script>

<template>
  <div class="m-auto flex h-full w-full max-w-sm flex-col justify-center p-5 pt-2">
    <h1 class="mb-12 text-center text-4xl font-bold">{{ authenticationModeTitle }}</h1>

    <LoginForm v-if="loginMode" :on-submit="handleLogin" :toggle-mode="toggleMode"></LoginForm>
    <RegisterForm v-else :on-submit="handleRegister" :toggle-mode="toggleMode"></RegisterForm>
  </div>
</template>
