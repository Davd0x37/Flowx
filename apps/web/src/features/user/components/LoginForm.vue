<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';
import { UserInterface } from '@flowx/shared';
import { PassKey, SignIn } from 'app/assets/icons';
import { VButton, VInputLabel } from 'app/components';

const props = defineProps<{
  onSubmit: (data: UserInterface) => void;
  toggleMode: () => void;
}>();

const { t } = useI18n();
const hasError = ref(false);
const formData = reactive<UserInterface>({
  email: '',
  password: '',
});

const handleSubmit = (ev: Event) => {
  ev.preventDefault();

  props.onSubmit(formData);
};
</script>

<template>
  <VButton class="mt-6" outline>
    <Icon :icon="PassKey" height="20" />
    <span class="hidden md:block">{{ t('user.authenticate.loginWith.passkeys') }}</span>
  </VButton>

  <span class="h-1px mb-6 mt-10 w-full border-t border-gray-700"></span>

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

      <!-- <div class="block text-right">
        <button class="btn btn-sm btn-link normal-case" type="button">
          {{ t('user.authenticate.recoverPassword') }}
        </button>
      </div> -->

      <VButton class="mt-4" color="primary" type="submit">
        <Icon :icon="SignIn" height="20" />
        {{ t('button.login') }}
      </VButton>

      <div class="block text-right">
        <VButton class="mt-4" color="link" size="sm" type="button" @click="toggleMode">
          {{ t('user.authenticate.dontHaveAccountSignUp') }}
        </VButton>
      </div>
    </div>
  </form>
</template>
