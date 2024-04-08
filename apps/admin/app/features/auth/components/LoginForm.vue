<script setup lang="ts">
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { UserInterface } from '@flowx/shared/types/modelTypes';
import { PassKey } from 'app/assets/icons';
import VButton from 'ui/VButton.vue';
import VInputLabel from 'ui/VInputLabel.vue';

const { t } = useI18n();

const props = defineProps<{
  onSubmit: (data: UserInterface) => void;
  toggleMode: () => void;
}>();

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
  <VButton outline>
    <PassKey height="20" />
    <span className="hidden md:ml-2 md:block">{{ t('auth.sign_in_with_passkeys') }}</span>
  </VButton>

  <!-- <Separator className="mb-6 mt-8 " /> -->

  <span class="h-1px mb-6 mt-10 w-full border-t border-gray-700" />

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
      />

      <VInputLabel
        id="password"
        v-model="formData.password"
        type="password"
        :label="t('auth.password')"
        minlength="8"
        autocomplete="new-password"
        required
      />

      <!-- <div class="block text-right">
        <VButton variant="ghost">
          {{ t('user.authenticate.recoverPassword') }}
        </VButton>
      </div> -->

      <VButton type="submit" variant="primary" class="mt-2">
        {{ t('auth.login') }}
      </VButton>

      <div class="block text-right">
        <VButton type="button" variant="link" @click="toggleMode">
          {{ t(`auth.dont_have_account_sign_up`) }}
        </VButton>
      </div>
    </div>
  </form>
</template>
