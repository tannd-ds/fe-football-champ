<template>
  <AppCard>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <dl class="grid grid-cols-1 gap-x-8 gap-y-20 text-center lg:grid-cols-3">
        <div 
          v-for="stat in stats" 
          :key="stat.id" 
          class="mx-auto flex max-w-xs flex-col gap-y-4"
        >
          <dt class="text-base leading-7 text-zinc-200">{{ stat.name }}</dt>
          <dd class="order-first text-8xl font-bold tracking-tight text-primary">{{ stat.value }}</dd>
        </div>
      </dl>
    </div>
  </AppCard>
</template>

<script setup>
const { data : stats } = useFetch('http://localhost:8000/api/admin/number_statistics');
</script>