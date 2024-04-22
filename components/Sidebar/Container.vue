<template>
  <div 
    class="py-8 w-[380px] h-screen bg-[#0A0A0A] flex flex-col justify-between items-center"
  >
    <div class="w-full px-8 flex flex-col gap-8">
      <div class="text-zinc-100 flex gap-4 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-10 h-10 text-primary" viewBox="0 0 256 256"><path d="M116.588 105.225c5.441-7.808 16.893-7.94 22.537-.397l.287.397l58.699 84.24a.102.102 0 0 0 .079.044l.045-.008l.038-.028a.106.106 0 0 1 .082-.034l.044.012l.035.03l19.023 25.94c1.009 1.375.875 3.285-.351 4.472C194.062 242.242 162.639 256 128 256c-34.637 0-66.062-13.758-89.106-36.107c-1.153-1.12-1.34-2.875-.517-4.225l.166-.249l19.023-25.939a.103.103 0 0 1 .079-.042l.045.008l.037.027a.107.107 0 0 0 .084.036l.044-.013l.035-.031zM128 0c70.693 0 128 57.308 128 128c0 23.828-6.51 46.135-17.85 65.24c-1.181 1.99-3.92 2.173-5.428.482l-.175-.212l-18.616-24.407a3.558 3.558 0 0 1-.408-3.589c5.043-11.48 7.843-24.17 7.843-37.514c0-51.564-41.801-93.365-93.366-93.365c-51.564 0-93.365 41.801-93.365 93.365c0 13.343 2.8 26.032 7.842 37.513a3.569 3.569 0 0 1-.238 3.347l-.17.243l-18.615 24.407c-1.46 1.915-4.375 1.8-5.604-.27C6.51 174.134 0 151.827 0 128C0 57.308 57.308 0 128 0"/></svg>
        <div class="flex flex-col">
          <span class="font-black text-2xl text-primary">FOOTBALL</span>
          <span class="font-black text-xl">SE103</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <SidebarDirectButton 
          v-for="btn in direct_btns" :key="btn.name"
          :is-active="'/' + String(route.name) == btn.path"
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
    </div>

    <div>
      <UDropdown 
        :items="usr_btns"
        :popper="{ 
          placement: 'top',
          offsetDistance: 12,
        }"
        mode="hover"
      >

        <UButton 
          size="lg"
          color="white" 
          label="Tài Khoản" 
          trailing-icon="i-heroicons-user-20-solid" 
        />

        <template #account="{ item }">
          <div class="text-left w-full">
            <p> Xin Chào, </p>
            <p class="truncate font-medium text-white">{{ item.label }}</p>
          </div>
        </template>
      
      </UDropdown>
      
    </div>

  </div>
</template>

<script setup>

const route = useRoute();
const router = useRouter();
const toasts = useToast();

const cookie_usr_info = useCookie('usr_info');

const direct_btns = [
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
  {
    name: 'Trận Đấu',
    icon: 'i-heroicons-calendar-20-solid',
    path: '/',
  },
  {
    name: 'Thông Báo',
    icon: 'i-heroicons-bell-20-solid',
    path: '/notification',
  }
]

const usr_btns = [
  [{
    // label: cookie_usr_info.value.user_name,
    label: "Admin",
    slot: 'account',
    disabled: true,
  }], [{
    label: 'Chỉnh Sửa Tài Khoản',
    icon: 'i-heroicons-cog-8-tooth',
    disabled: true,
  }], [{
    label: 'Đăng Xuất',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: () => logout(),
  }],
]

const logout = () => {
  if (!confirm('Bạn có chắc chắn muốn đăng xuất?') ) return;

  try {
    const cookie = useCookie('auth');
    cookie.value = null;
    cookie_usr_info.value = null;

    toasts.add({ 
      title: 'Đăng xuất thành công', 
      description: 'Hẹn gặp lại bạn!'
    });

    router.push('/login');
  } catch (error) {
    toasts.add({ 
      title: 'Thất Bại', 
      description: 'Đăng xuất không thành công'
    });
  }
}
</script>