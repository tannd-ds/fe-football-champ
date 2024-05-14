<template>
  <div
    class="relative w-full aspect-square p-4 bg-zinc-900 rounded-lg bg-opacity-80
        border border-zinc-800
        transition-all duration-200 ease-in-out"
    v-if="info.id != -1"
  >
    <div 
      class="flex flex-col gap-2 items-center"
    >
      <LazyUAvatar 
        :src="`http://localhost:8000/api/get_img/team__${info.url_image}`"
        alt="team_1_logo" 
        size="lg"
      />

      <span 
        class="w-full font-bold text-sm text-center truncate"
        :class="{ 'text-gray-500': info.id == -1 }"
      >
        {{ info.name_team }}
      </span>
    </div>

    <div class="absolute right-2 top-2">
      <UDropdown 
        :items="manage_team_option" :popper="{ placement: 'bottom-start' }"
      >
        <div class="w-5 h-5 hover:bg-zinc-800 rounded">
          <UIcon name="i-heroicons-ellipsis-vertical" class="w-5 h-5 text-gray-500" />
        </div>
      </UDropdown>
    </div>

  </div>

  <CModal v-else >
    <template #open-button>
      <div
        class="w-full aspect-square p-4 bg-zinc-900 hover:bg-zinc-800 rounded-lg bg-opacity-80
            border border-zinc-800
            transition-all duration-200 ease-in-out cursor-pointer"
        @click="on_click"
      >
        <div
          class="flex flex-col gap-2 items-center"
        >
          <LazyUIcon 
            name="i-heroicons-plus"
            class="w-12 h-12 text-gray-500"
          />

          <span 
            class="w-full font-bold text-sm text-center truncate"
            :class="{ 'text-gray-500': info.id == -1 }"
          >
            {{ info.id != -1 ? info.name_team : 'Thêm Đội bóng' }}
          </span>
        </div>
      </div>
    </template>

    <template #dialog>
      <div class="w-[75vw] h-[96vh] overflow-auto text-left">
        <CTeam />
      </div>
    </template>
  </CModal>
</template>

<script setup>

const props = defineProps({
  info: {
    type: Object,
    required: true
  }
});

const router = useRouter();
const { value: cookie_usr_info } = useCookie('usr_info');

const on_click = () => {
  if (props.info.id != -1) {
    router.push(`/team/${props.info.id}`);
  }
}

let manage_team_option = [
  [{
    label: 'Xem Thông Tin',
    icon: 'i-heroicons-eye',
    click: () => {
      router.push(`/team/${props.info.id}`);
    }
  },
  ]
];

if (cookie_usr_info.role === 1) {
  manage_team_option[0].push({
    label: 'Đá khỏi Giải',
    icon: 'i-heroicons-trash',
    click: () => {
      console.log('Delete');
      if (confirm('Bạn có chắc chắn muốn xóa đội bóng này khỏi giải đấu?')) {
        console.log('Delete');
        
      }
    }
  });
}

</script>