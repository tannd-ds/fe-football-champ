<template>
  <div 
    class="py-8 w-[380px] h-screen bg-zinc-900 bg-opacity-90 flex flex-col justify-between items-center"
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

        <UButton 
          size="lg"
          variant="ghost"
          color="white" 
          label="Thông Báo" 
          icon="i-heroicons-bell-20-solid" 
          @click="open_notification"
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

    <AppUserNotification 
      :open="notif_open"
      @close="notif_open = false"
    >
      <template #content>
        <div class="flex flex-col gap-4">
          <div
            v-for="notif in notifs"
            :key="notif.id"
            class="w-full p-4 bg-zinc-900 hover:bg-zinc-800
                rounded-lg flex flex-col gap-2
                border border-zinc-800 cursor-pointer
                transition-all duration-200 ease-in-out"
            @click="read_notif(notif.id)"
          >
            <div 
              :class="[notif.seen ? 'font-normal text-zinc-400' : 'font-semibold text-white']">
              {{ notif.content }}
            </div>
            <div class="flex justify-end">
              <span class="text-sm font-light text-zinc-400">
                {{ notif.time }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </AppUserNotification>
  </div>
</template>

<script setup>

const router = useRouter();
const { value: cookie_usr_info } = useCookie('usr_info');

const notif_open = ref(false);
function open_notification() {
  notif_open.value = true;
}

const fetch_notif = async () => {
  let { data: response } = await useFetch(`http://localhost:8000/api/notification/get/${cookie_usr_info.id}`);
  return response.value;
}

const notifs = ref([]);
notifs.value = await fetch_notif();

const read_notif = async (id) => {
  notifs.value.find(notif => notif.id === id).seen = true;
  let { data: response } = await useFetch(`http://localhost:8000/api/notification/seen/${id}`);
}

</script>
