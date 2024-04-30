<template>
  <div 
    class="py-8 w-[380px] h-screen bg-zinc-900 bg-opacity-90 flex flex-col justify-between items-center"
  >
    
    <div class="w-full flex flex-col gap-8">
      <div class="w-full px-8 flex flex-col gap-8">
        <SidebarLogo />
      </div>

      <div class="ml-8 mr-4 flex flex-col gap-2">
        <div class="font-light mb-2 text-md">Chung</div>
        <UButton 
          size="lg"
          variant="ghost"
          color="white" 
          label="Nhà" 
          icon="i-heroicons-home-20-solid" 
          @click="() => router.push('/')"
          square
        />
        <UButton 
          size="lg"
          variant="ghost"
          color="white" 
          label="Mùa Giải" 
          icon="i-heroicons-globe-alt-20-solid" 
          @click="() => router.push({
            path: '/season',
            query: { public: true }
          })"
          square
        />
        <UButton 
          size="lg"
          variant="ghost"
          color="white" 
          label="Danh sách Đội Bóng" 
          icon="i-heroicons-user-group-20-solid" 
          @click="() => router.push({
            path: '/team',
            query: { public: true }
          })"
          square
        />

        <div class="font-light mb-2 text-md">Quản Lý</div>

        <UButton 
          size="lg"
          variant="ghost"
          color="white" 
          label="Đội của tôi" 
          icon="i-heroicons-users-20-solid" 
          @click="() => router.push('/team/my')"
          square
        />

        <UButton 
          size="lg"
          variant="ghost"
          color="white" 
          label="Đơn Đăng Ký" 
          icon="i-heroicons-document-duplicate-20-solid" 
          @click="() => router.push('/register/my')"
          square
        />
      </div>
    </div>

    <SidebarUserButton />
  </div>
</template>

<script setup>

const route = useRoute();
const router = useRouter();

</script>
