<template>
  <div 
    class="py-8 w-[380px] h-screen bg-zinc-900 bg-opacity-90 flex flex-col justify-between items-center print:hidden"
  >
    <div class="w-full px-8 flex flex-col gap-8">
      <SidebarLogo />

      <div class="grid grid-cols-2 gap-4">
        <SidebarDirectButton 
          v-for="btn in direct_btns" :key="btn.name"
          :is-active="is_active(btn.path)"
          :on-click="() => { router.push(btn.path) }"
        >
          <template #icon>
            <UIcon :name="btn.icon" class="text-3xl" />
          </template>
          <template #text>
            {{ btn.name }}
          </template>
        </SidebarDirectButton>
      </div>

      <div class="flex flex-col gap-2">
        <div class="font-light mb-2 text-md">Quản Lý</div>
        <UButton 
          size="lg"
          variant="ghost"
          color="black" 
          label="Báo Cáo" 
          icon="i-heroicons-chart-bar-20-solid" 
          @click="() => router.push('/report')"
          square
        />

        <UButton 
          size="lg"
          variant="ghost"
          color="black" 
          label="Người Dùng" 
          icon="i-heroicons-users-20-solid" 
          @click="() => router.push('/user')"
          square
        />

        <UButton 
          size="lg"
          variant="ghost"
          color="black" 
          label="Thông Báo" 
          icon="i-heroicons-bell-20-solid" 
          @click="() => router.push('/notification')"
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

const direct_btns = [
  {
    name: 'Trang Chủ',
    icon: 'i-heroicons-home-20-solid',
    path: '/',
  },
  {
    name: 'Mùa Giải',
    icon: 'i-heroicons-globe-alt-20-solid',
    path: '/season',
  },
  {
    name: 'Đội Bóng',
    icon: 'i-heroicons-user-group-20-solid',
    path: '/team',
  },
  {
    name: 'Cầu Thủ',
    icon: 'i-heroicons-user-20-solid',
    path: '/soccer',
  },
]

const is_active = (path) => {
  return route.path.split('/')[1] == path.split('/')[1];
}

</script>