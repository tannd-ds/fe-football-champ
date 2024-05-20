<template>
  <AppCard class="w-full h-full">
    <div class="h-full flex flex-col justify-between">
      <div>
        <div class="mb-4 text-2xl font-bold select-none">Bảng Xếp Hạng</div>
        <div class="w-full flex gap-4 overflow-auto">
          <div v-for="season in all_seasons" :key = "season.id">
            <UTooltip 
              :text="season.name_season"
              :popper="{ placement: 'top' }"
            >
              <div 
                class="mb-2 px-2 py-1 w-44 cursor-pointer border border-zinc-700 rounded-lg truncate text-center text-xs"
                :class="season.id === chosen_season_id ? 'bg-zinc-700' : 'bg-transparent'"
                @click="choose_season(season.id)"
              >
                {{ season.name_season }}
              </div>
            </UTooltip>
          </div>
        </div>
      </div>

      <div class="h-full flex justify-center items-center text-center">
        <CLoadingIcon v-if="teams_on_loading" />

        <CTeamLeaderboard v-else-if="teams_info.length > 0" :teams="teams_info" />

        <div v-else>Chưa có Thông tin</div>
      </div>
    </div>
  </AppCard>
</template>

<script setup>

const all_seasons = ref([]);
const chosen_season_id = ref(-1);
const teams_info = ref([]);
const teams_on_loading = ref(false);

const fetch_teams = async () => {
  teams_on_loading.value = true;
  if (chosen_season_id.value == -1) {
    teams_on_loading.value = false;
    return;
  }
  teams_info.value = await $fetch(`http://localhost:8000/api/match/listteam/${chosen_season_id.value}`);
  // only show top 3
  teams_info.value = teams_info.value.slice(0, 3);
  teams_on_loading.value = false;
}

const choose_season = (season_id) => {
  chosen_season_id.value = season_id;
  fetch_teams();
}

onMounted(async () => {
  all_seasons.value = await $fetch('http://localhost:8000/api/season/get_simple');

  if (all_seasons.value.length != 0)
    chosen_season_id.value = all_seasons.value[0].id;

  fetch_teams();
})

</script>