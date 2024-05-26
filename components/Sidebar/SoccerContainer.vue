<template>
  <div 
    class="py-8 w-[380px] h-screen bg-zinc-900 bg-opacity-90 flex flex-col justify-between items-center print:hidden"
  >
    
    <div class="w-full flex flex-col gap-8">
      <div class="w-full px-8 flex flex-col gap-8">
        <SidebarLogo />
      </div>

      <div class="ml-8 mr-4 flex flex-col gap-2">
        <div class="font-light mb-2 text-md">Quản Lý</div>

        <UButton 
          size="lg"
          variant="ghost"
          color="white" 
          label="Nhà" 
          icon="i-heroicons-home-20-solid" 
          @click="() => router.push('/')"
          square
        />

        <div class="font-light mb-2 text-md">Tra Cứu</div>

        <UButton 
          size="lg"
          variant="ghost"
          color="white" 
          label="Mùa Giải" 
          icon="i-heroicons-globe-alt-20-solid" 
          @click="() => router.push({
            path: '/season',
          })"
          square
        />

        <UButton 
          size="lg"
          variant="ghost"
          color="white" 
          label="Đội Bóng" 
          icon="i-heroicons-user-group-20-solid" 
          @click="() => router.push({
            path: '/team',
          })"
          square
        />

        <UButton 
          size="lg"
          variant="ghost"
          color="white" 
          label="Cầu Thủ" 
          icon="i-heroicons-user-20-solid" 
          @click="() => router.push({
            path: '/soccer',
          })"
          square
        />

      </div>
    </div>

    <SidebarUserButton />

  </div>
</template>

<script setup>

const router = useRouter();
const { value: cookie_usr_info } = useCookie('usr_info');
</script>
