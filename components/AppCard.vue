<template>
  <div class="p-8 relative flex justify-center rounded-xl bg-zinc-900 bg-opacity-90 card-fade-in"
    :style="{ animationDelay: `${general_store.n_elements * 0.128}s`}"
  >
    <div class="w-full h-full">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useGeneralStore } from '~/stores/generalStore';
const general_store = useGeneralStore();

general_store.increase_n_elements();
</script>