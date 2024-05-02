<template>
  <div class="w-full h-[98vh]">
    <AppCard class="h-full">
      <div class="h-full flex items-center justify-center">
        <div class="flex flex-col gap-4 items-center text-gray-600">
          <UIcon name="i-heroicons-bookmark-slash-20-solid" class="text-6xl" />
          <div class="text-3xl font-bold text-center">Bạn chưa quản lý Đội Bóng nào...</div>
          <div class="text-center">
            Bạn có thể tạo một đội bóng tại đây!
          </div>
            <a 
              @click.prevent="router.push('/team/update')"
              class="flex-none rounded-full bg-yellow-600
                px-3.5 py-1 text-sm font-semibold text-zinc-200 shadow-sm hover:bg-yellow-700 
                focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-gray-900 cursor-pointer
                transition-all duration-200 ease-in-out"
            >
              Đi Thôi <span aria-hidden="true">&rarr;</span>
            </a>
        </div>
      </div>
    </AppCard>
  </div>
</template>

<script setup>
const router = useRouter();
onBeforeMount(() => {
  const { value: cookie_usr_info } = useCookie('usr_info');
  if (cookie_usr_info.team_id != null)
    router.push(`/team/${cookie_usr_info.team_id}`);
})
</script>