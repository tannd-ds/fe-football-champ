<template>
  <AppCard class="h-full">
    <div class="w-full h-full flex flex-col">
      <div class="mb-4 flex justify-between">
        <div class="text-2xl font-bold">Bản Tin</div>
        <UButton 
          v-if="cookie_usr_info.role == 1"
          color="primary"
          icon="i-heroicons-newspaper"
          label="Đăng Tin"
          @click="create_news"
        />
      </div>

      
      <div 
        v-if="news_is_loading"
        class="p-12 flex items-center justify-center"
      >
        <CLoadingIcon />
      </div>

      <div 
        v-else
        class="grow flex flex-col gap-2 overflow-auto divide-y divide-gray-700">
        <div v-for="n in news" :key="n.id" class="flex flex-col pt-2 gap-1">
          <div 
            class="text-base font-semibold hover:text-primary truncate cursor-pointer transition-colors duration-300 ease-in-out"
            @click="open_news_detail(n.id)"
          >
            {{ n.title }}
          </div>
          <div class="text-right text-sm text-gray-500">{{ n.time }}</div>
        </div>

        <div 
          v-if="news.length == 0"
          class="h-full flex justify-center items-center text-gray-500"
        >
          Không có thông báo
        </div>
      </div>
    </div>
  </AppCard>

  <UModal v-model="news_detail_is_open">
    <div 
      v-if="!news_detail_is_loading"
      class="p-12"
    >
      <div class="mb-4 text-2xl font-bold">{{ news_detail.title }}</div>
      <div class="whitespace-pre-line">
        {{ news_detail.content }}
      </div>
    </div>

    <div 
      v-else
      class="p-12 flex items-center justify-center"
    >
      <CLoadingIcon />
    </div>
  </UModal>
</template>

<script setup>

const props = defineProps({
  season_id: {
    type: String,
    required: true
  }
})

const router = useRouter();
const { value: cookie_usr_info } = useCookie('usr_info');

const news = ref([]);
const news_is_loading = ref(true);

const news_detail_is_open = ref(false);
const news_detail_is_loading = ref(false);
const news_detail = ref({});

const open_news_detail = async (id) => {
  news_detail_is_open.value = true;


  news_detail_is_loading.value = true;
  news_detail.value = await $fetch(`http://localhost:8000/api/notification/get_by_id/${id}`);
  news_detail_is_loading.value = false;
}

const create_news = () => {
  router.push({
    path: `/notification/update`,
    query: {
      season_id: props.season_id,
    }
  })
}

onMounted(async () => {
  news.value = await $fetch(`http://localhost:8000/api/notification/get_by_season/${props.season_id}`);
  news_is_loading.value = false;
})

</script>