<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';
import { UserInterface } from '@flowx/shared';
import { PassKey, SignIn } from 'app/assets/icons';
import { VInputLabel } from 'app/components';

const props = defineProps<{
  onSubmit: (data: UserInterface) => void;
}>();

const { t } = useI18n();
const hasError = ref(false);
const formData = reactive<UserInterface & { rememberMe: boolean }>({
  email: '',
  password: '',
  rememberMe: false,
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
        :label="t('user.authenticate.email')"
        input-type="email"
        v-model="formData.email"
        autocomplete="email"
        required
        :placeholder="t('placeholder.email')"
        :show-error="hasError"
        :error-message="t('error.userAlreadyExists')"
      />

      <VInputLabel
        id="password"
        :label="t('user.authenticate.password')"
        input-type="password"
        v-model="formData.password"
        minlength="8"
        autocomplete="new-password"
        required
        :show-error="hasError"
        :error-message="t('error.incorrectPassword')"
      />

      <div class="block text-right">
        <button class="btn btn-sm btn-link" type="button">{{ t('user.authenticate.recoverPassword') }}</button>
      </div>

      <button class="btn btn-primary" type="submit">
        <Icon :icon="SignIn" height="20" />
        {{ t('button.login') }}
      </button>
    </div>
  </form>

  <span class="h-1px my-6 w-full border-t border-gray-700"></span>

  <button class="btn btn-outline" type="submit">
    <Icon :icon="PassKey" height="20" />
    <span class="hidden md:block">{{ t('user.authenticate.loginWith.passkeys') }}</span>
  </button>
</template>
