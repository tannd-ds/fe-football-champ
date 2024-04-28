<template>
  <div 
    class="py-8 w-[380px] h-screen bg-zinc-900 bg-opacity-90 flex flex-col justify-between items-center"
  >
    
    <div class="w-full px-8 flex flex-col gap-8">
      <SidebarLogo />
    </div>

    <div class="flex flex-col gap-2">
      <div class="font-light mb-2 text-md">Quản Lý</div>
      <UButton 
        size="lg"
        variant="ghost"
        color="black" 
        label="Nhà" 
        icon="i-heroicons-home-20-solid" 
        @click="() => router.push('/')"
        square
      />
      <UButton 
        size="lg"
        variant="ghost"
        color="black" 
        label="Đội của tôi" 
        icon="i-heroicons-users-20-solid" 
        @click="() => router.push('/team/my')"
        square
      />
    </div>

    <SidebarUserButton />
  </div>
</template>

<script setup>

const route = useRoute();
const router = useRouter();

</script>
