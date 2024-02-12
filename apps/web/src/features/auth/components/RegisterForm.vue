<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { UserRegisterInterface } from '@flowx/shared';

import VButton from 'ui/VButton.vue';
import VInputLabel from 'ui/VInputLabel.vue';

const { t } = useI18n();

const props = defineProps<{
  onSubmit: (data: UserRegisterInterface) => void;
  toggleMode: () => void;
}>();

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
    <div class="form-control gap-4">
      <VInputLabel
        id="email"
        v-model="formData.email"
        type="email"
        :label="t('auth.email')"
        autocomplete="email"
        required
        :placeholder="t('placeholder.email')"
        :show-error="hasError"
        :error-message="t('auth.user_already_exists')"
      />

      <VInputLabel
        id="password"
        v-model="formData.password"
        type="password"
        :label="t('auth.password')"
        minlength="8"
        autocomplete="new-password"
        required
        :show-error="hasError"
      />

      <VInputLabel
        id="repeatPassword"
        v-model="formData.repeatPassword"
        type="password"
        :label="t('auth.repeat_password')"
        minlength="8"
        autocomplete="new-password"
        required
        :show-error="hasError"
      />

      <VButton type="submit" variant="primary" class="mt-2">{{ t('auth.create_account') }}</VButton>

      <div class="block text-right">
        <VButton type="button" variant="link" @click="toggleMode">
          {{ t('auth.already_have_account_sign_in') }}
        </VButton>
      </div>
    </div>
  </form>
</template>
