<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { Icon } from '@iconify/vue';

import { UserRegisterInterface } from '@flowx/shared';

import { SignIn } from 'app/assets/icons';
import { VButton, VInputLabel } from 'app/components';

const props = defineProps<{
  onSubmit: (data: UserRegisterInterface) => void;
  toggleMode: () => void;
}>();

const { t } = useI18n();
const hasError = ref(false);
const formData = reactive<UserRegisterInterface>({
  email: '',
  password: '',
  repeatPassword: '',
});

const handleSubmit = (ev: Event) => {
  ev.preventDefault();

  props.onSubmit(formData);
};
</script>

<template>
  <form method="POST" action="/" @submit="handleSubmit">
    <div class="form-control gap-2">
      <VInputLabel
        id="email"
        v-model="formData.email"
        :label="t('user.authenticate.email')"
        input-type="email"
        autocomplete="email"
        required
        :placeholder="t('placeholder.email')"
        :show-error="hasError"
        :error-message="t('error.userAlreadyExists')"
      />

      <VInputLabel
        id="password"
        v-model="formData.password"
        :label="t('user.authenticate.password')"
        input-type="password"
        minlength="8"
        autocomplete="new-password"
        required
        :show-error="hasError"
        :error-message="t('error.incorrectPassword')"
      />

      <VInputLabel
        id="repeatPassword"
        v-model="formData.repeatPassword"
        :label="t('user.authenticate.repeatPassword')"
        input-type="password"
        minlength="8"
        autocomplete="new-password"
        required
        :show-error="hasError"
        :error-message="t('error.incorrectPassword')"
      />

      <VButton class="mt-4" color="primary" type="submit">
        <Icon :icon="SignIn" height="20" />
        {{ t('button.createAccount') }}
      </VButton>

      <div class="block text-right">
        <VButton class="mt-4" color="link" size="sm" type="button" @click="toggleMode">
          {{ t('user.authenticate.alreadyHaveAccountSignIn') }}
        </VButton>
      </div>
    </div>
  </form>
</template>
