<script setup lang="ts">
import { ArrowLeft } from 'app/assets/icons';
import VButton from 'ui/VButton.vue';

const router = useRouter();

const goBackBtn = () => {
  router.push({ name: 'Home' });
};
</script>

<template>
  <div class="m-auto flex h-screen w-screen items-center justify-center">
    <div class="flex flex-col items-center gap-8">
      <h3 class="text-5xl"><span class="text-sky-700">[404]</span> Looks like we are missing a page</h3>

      <VButton class="text-lg" @click="goBackBtn"> <ArrowLeft class="mr-2" /> Go back </VButton>
    </div>
  </div>
</template>
