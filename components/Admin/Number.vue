<template>
  <div class="grid grid-cols-4 gap-x-8 gap-y-20 text-center">
    <div 
      v-for="(stat, state_index) in stats" 
      :key="stat.id" 
      class="relative rounded-lg p-6 shadow-lg dark:text-white overflow-hidden card-fade-in"
      :class="stat.color"
      :style="{ animationDelay: stat.delay}"
    >
      <dt class="text-lg leading-7 text-zinc-200 font-bold select-none">{{ stat.name }}</dt>
      <dd class="order-first text-8xl font-bold tracking-tight text-white select-none">{{ stat.value }}</dd>
      <div class="absolute -left-20 top-0">
        <UIcon :name="stat.icon" class="w-48 h-48 opacity-20" />
      </div>
    </div>
  </div>
</template>

<script setup>

import { useGeneralStore } from '~/stores/generalStore';
const general_store = useGeneralStore();

const stats = ref([]);

onMounted(async () => {
  stats.value = await $fetch('http://localhost:8000/api/admin/number_statistics');

  const colors = ['bg-green-500', 'bg-orange-500', 'bg-red-600', 'bg-indigo-500']
  const icons  = [
    'i-heroicons-globe-alt-solid',
    'i-heroicons-user-group-20-solid',
    'i-heroicons-user-circle-solid',
    'i-heroicons-newspaper-solid',
  ]

  for (let i = 0; i < stats.value.length; i++) {
    stats.value[i].color = colors[i];
    stats.value[i].icon = icons[i];
    stats.value[i].delay = `${general_store.n_elements * 0.1 }s`;
    general_store.increase_n_elements();
  }
});

</script>