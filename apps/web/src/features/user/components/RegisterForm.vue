<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { UserRegisterInterface } from '@flowx/shared';
import { VButton, VInputLabel } from 'app/components';

const props = defineProps<{
  onSubmit: (data: UserRegisterInterface) => void;
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
  <form method="GET" action="/" @submit="handleSubmit">
    <div class="flex flex-col space-y-4">
      <div>
        <VInputLabel
          html-for="email"
          input-type="email"
          v-model="formData.email"
          autocomplete="email"
          required
          :placeholder="t('placeholder.email')"
          :show-error="hasError"
          :error-message="t('error.userAlreadyExists')"
          >{{ t('user.authenticate.email') }}</VInputLabel
        >
      </div>

      <div>
        <VInputLabel
          html-for="password"
          input-type="password"
          v-model="formData.password"
          minlength="8"
          autocomplete="new-password"
          required
          :show-error="hasError"
          :error-message="t('error.incorrectPassword')"
          >{{ t('user.authenticate.password') }}</VInputLabel
        >
      </div>

      <div>
        <VInputLabel
          html-for="repeatPassword"
          input-type="password"
          v-model="formData.password"
          minlength="8"
          autocomplete="new-password"
          required
          :show-error="hasError"
          :error-message="t('error.incorrectPassword')"
          >{{ t('user.authenticate.repeatPassword') }}</VInputLabel
        >
      </div>
    </div>
    <VButton class="mt-6 w-full" type="submit">{{ t('button.createAccount') }}</VButton>
  </form>
</template>
