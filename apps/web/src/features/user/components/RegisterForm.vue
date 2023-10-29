<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';
import { UserRegisterInterface } from '@flowx/shared';
import { SignIn } from 'app/assets/icons';
import { VInputLabel } from 'app/components';

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

      <button class="btn btn-primary mt-4" type="submit">
        <Icon :icon="SignIn" height="20" />
        {{ t('button.createAccount') }}
      </button>

      <div class="block text-right">
        <button class="btn btn-sm btn-link text-secondary justify-end normal-case" type="button" @click="toggleMode">
          {{ t('user.authenticate.alreadyHaveAccountSignIn') }}
        </button>
      </div>
    </div>
  </form>
</template>
