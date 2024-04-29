<script setup>
const props = defineProps({ error: Object })
</script>

<template>
  <NuxtLayout name="error">
    <div class="flex flex-col gap-4">
      <!-- <h1 class="text-9xl font-mono">{{ error.statusCode }}</h1> -->
      <h1 class="text-8xl font-mono text-primary">ÔI KHÔNG...</h1>
      <div class="text-xl">Bạn không thể truy cập vào trang này...</div>
      <NuxtLink to="/">
        <UButton>
          Về Trang Chủ
        </UButton>
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>
