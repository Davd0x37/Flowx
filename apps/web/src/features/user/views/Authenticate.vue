<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { UserInterface, UserRegisterInterface } from '@flowx/shared';
import { LoginForm, RegisterForm } from '../components';

const { t } = useI18n();

const loginMode = ref(true);
const authenticationModeTitle = computed(() =>
  loginMode.value ? t('user.authenticate.login') : t('user.authenticate.register'),
);

const handleLogin = (ev: UserInterface) => {
  console.log(ev);
};

const handleRegister = (ev: UserRegisterInterface) => {
  console.log(ev);
};
</script>

<template>
  <div className="m-auto h-full max-w-lg p-5 pt-2 flex flex-col justify-center ">
    <h1 class="mb-6 text-center text-4xl font-bold">{{ authenticationModeTitle }}</h1>

    <LoginForm v-bind:onSubmit="handleLogin" v-if="loginMode"></LoginForm>
    <RegisterForm v-bind:onSubmit="handleRegister" v-else></RegisterForm>
  </div>
</template>
