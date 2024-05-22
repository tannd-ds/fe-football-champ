<template>
  <div 
    class="h-full flex justify-center text-center"
  >
    <CTeamLeaderboard 
      v-if="teams_info.length > 0" 
      :loading="teams_on_loading"
      :teams="teams_info" 
    />

    <div 
      v-else
      class="w-full h-full flex items-center justify-center"
    >
      Chưa có Thông tin
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  chosen_season_id: {
    type: String,
    required: true,
  }
})

const teams_info = ref([]);
const teams_on_loading = ref(false);

const fetch_teams = async () => {
  teams_on_loading.value = true;
  if (props.chosen_season_id == "-1") {
    teams_on_loading.value = false;
    return;
  }
  teams_info.value = await $fetch(`http://localhost:8000/api/match/listteam/${props.chosen_season_id}`);
  teams_on_loading.value = false;
}

watchEffect(() => {
  fetch_teams();
})

</script>