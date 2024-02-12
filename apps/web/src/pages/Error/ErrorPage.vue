<script setup lang="ts">
import { Reload } from 'app/assets/icons';

import VButton from 'ui/VButton.vue';

const refreshPage = () => window.location.reload();
</script>

<template>
  <div class="m-auto flex h-screen w-screen items-center justify-center">
    <div class="flex flex-col items-center gap-8">
      <h3 class="max-w-[90%] text-center text-5xl [text-wrap:balance]">
        We're currently experiencing difficulties displaying the website for you.
      </h3>

      <VButton class="text-lg" @click="refreshPage"> Refresh <Reload class="ml-2" font-size="1.6rem" /> </VButton>
    </div>
  </div>
</template>
