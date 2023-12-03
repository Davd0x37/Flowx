<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';
import { UserInterface } from '@flowx/shared';
import { PassKey, SignIn } from 'app/assets/icons';
import { VButton, VInputLabel } from 'app/components';
import { useFormValidation } from '../composables';

const props = defineProps<{
  onSubmit: (data: UserInterface) => void;
  toggleMode: () => void;
}>();

const { t } = useI18n();
// const hasError = ref(false);
// const formData = reactive<UserInterface>({
//   email: '',
//   password: '',
// });

const { isDirty, fields } = useFormValidation<UserInterface & { repeat_password: string }>({
  email: {
    default: '',
    required: true,
    validate(val) {
      console.log(val);
      if (!val.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi)) {
        return {
          valid: false,
          message: 'incorrect email',
        };
      }

      return {
        valid: true,
        message: '',
      };
    },
  },
  password: {
    default: '',
    required: true,
    validate(val) {
      if (fields.repeat_password.value !== val) {
        return {
          valid: false,
          message: "passwords don't match",
        };
      }

      return {
        valid: true,
        message: '',
      };
    },
  },
  repeat_password: {
    default: '',
    required: true,
    validate(val) {
      if (fields.password.value !== val) {
        return {
          valid: false,
          message: "passwords don't match",
        };
      }

      return {
        valid: true,
        message: '',
      };
    },
  },
});

const handleSubmit = (ev: Event) => {
  ev.preventDefault();
  console.log(fields);

  // fields.email.value = 'asdasd';

  // props.onSubmit({
  //   email: fields.email,
  //   password: fields.password,
  // } as any);
};
</script>

<template>
  <VButton class="mt-6" outline>
    <Icon :icon="PassKey" height="20" />
    <span class="hidden md:block">{{ t('user.authenticate.loginWith.passkeys') }}</span>
  </VButton>

  {{ isDirty }}

  {{ fields.email.value }}

  <span class="h-1px mb-6 mt-10 w-full border-t border-gray-700"></span>

  <form method="POST" action="/" @submit="handleSubmit" novalidate>
    <div class="form-control gap-2">
      <VInputLabel
        id="email"
        v-model="fields.email.value"
        :label="t('user.authenticate.email')"
        input-type="email"
        autocomplete="email"
        required
        :placeholder="t('placeholder.email')"
        :show-error="!!fields.email.error"
        :error-message="fields.email.error"
      />

      <VInputLabel
        id="password"
        v-model="fields.password.value"
        :label="t('user.authenticate.password')"
        input-type="password"
        minlength="8"
        autocomplete="new-password"
        required
        :show-error="!!fields.password.error"
        :error-message="fields.password.error"
      />

      <VInputLabel
        id="password2"
        v-model="fields.repeat_password.value"
        :label="t('user.authenticate.password')"
        input-type="password"
        minlength="8"
        autocomplete="new-password"
        required
        :show-error="!!fields.repeat_password.error"
        :error-message="fields.repeat_password.error"
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
