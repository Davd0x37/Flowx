<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { UserInterface, UserRegisterInterface } from '@flowx/shared';
import { VTab, VTabs } from 'app/components';
import { LoginForm, RegisterForm } from '../components';

const { t } = useI18n();

const handleLogin = (ev: UserInterface) => {
  console.log(ev);
};

const handleRegister = (ev: UserRegisterInterface) => {
  console.log(ev);
};
</script>

<template>
  <div className="relative">
    <div className="m-auto max-w-md rounded-md bg-neutral-200 dark:bg-neutral-800 shadow-md p-5 pt-2 ">
      <VTabs centered>
        <VTab :name="t('user.authenticate.login')">
          <LoginForm :onSubmit="handleLogin"></LoginForm>
        </VTab>

        <VTab :name="t('user.authenticate.register')">
          <RegisterForm :onSubmit="handleRegister"></RegisterForm>
        </VTab>
      </VTabs>
    </div>
  </div>
</template>
