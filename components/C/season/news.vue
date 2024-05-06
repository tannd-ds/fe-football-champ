<template>
  <AppCard>

    <div class="mb-4 flex justify-between">
      <div class="text-2xl font-bold">Bản Tin</div>
      <UButton 
        color="primary"
        icon="i-heroicons-newspaper"
        label="Đăng Tin"
        @click=""
      />
    </div>

    <div class="flex flex-col gap-2 max-h-[256px] overflow-auto divide-y divide-gray-700">
      <div v-for="n in news" :key="n.id" class="flex flex-col pt-2 gap-1">
        <div 
          class="text-base font-semibold hover:text-primary truncate cursor-pointer transition-colors duration-300 ease-in-out"
          @click="open_news_detail(n.id)"
        >
          {{ n.title }}
        </div>
        <div class="text-right text-sm text-gray-500">{{ n.time }}</div>
      </div>
    </div>

  </AppCard>

  <UModal v-model="news_detail_is_open">
    <div 
      v-if="!news_detail_is_loading"
      class="p-12"
    >
      <div class="mb-4 text-2xl font-bold">{{ news_detail.title }}</div>
      {{ news_detail.content }}
    </div>

    <div 
      v-else
      class="p-12 flex items-center justify-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
        <circle cx="12" cy="2" r="0" fill="currentColor">
          <animate attributeName="r" begin="0" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/>
        </circle>
        <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)">
          <animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/>
        </circle>
        <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(90 12 12)">
          <animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/>
        </circle>
        <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(135 12 12)">
          <animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/>
        </circle>
        <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(180 12 12)">
          <animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/>
        </circle>
        <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(225 12 12)">
          <animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/>
        </circle>
        <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(270 12 12)">
          <animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/>
        </circle>
        <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(315 12 12)">
          <animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/>
        </circle>
      </svg>
    </div>
  </UModal>
</template>

<script setup>

const props = defineProps({
  season_id: {
    type: Number,
    required: true
  }
})

const news = await $fetch(`http://localhost:8000/api/notification/get_by_season/${props.season_id}`);

const news_detail_is_open = ref(false);
const news_detail_is_loading = ref(false);
const news_detail = ref({});

const open_news_detail = async (id) => {
  news_detail_is_open.value = true;

  news_detail_is_loading.value = true;
  news_detail.value = await $fetch(`http://localhost:8000/api/notification/get_by_id/${id}`);
  news_detail_is_loading.value = false;
}

</script>