<template>
  <LazyCSeasonTopSoccers 
    v-if="soccers_info.length > 0"
    :loading="soccers_on_loading"
    :soccers="soccers_info"
  />

  <div 
    v-else
    class="w-full h-full flex items-center justify-center"
  >
    Chưa có Thông tin
  </div>
</template>

<script setup>

const props = defineProps({
  chosen_season_id: {
    type: String,
    required: true,
  }
})

const soccers_info = ref([]);
const soccers_on_loading = ref(false);

const fetch_soccers = async () => {
  soccers_on_loading.value = true;
  if (props.chosen_season_id == "-1") {
    soccers_on_loading.value = false;
    return;
  }
  soccers_info.value = await $fetch(`http://localhost:8000/api/season/top_soccers/${props.chosen_season_id}`);
  soccers_info.value = await processSoccer(soccers_info.value);
  soccers_on_loading.value = false;
}

watchEffect(() => {
  fetch_soccers();
})

</script>