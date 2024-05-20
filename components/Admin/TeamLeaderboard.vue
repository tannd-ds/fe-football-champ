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
                class="mb-2 px-4 py-2 w-52 cursor-pointer border border-zinc-700 rounded-lg truncate text-center text-sm"
                :class="season.id === chosen_season_id ? 'bg-zinc-700' : 'bg-transparent'"
                @click="chosen_season_id = season.id"
              >
                {{ season.name_season }}
              </div>
            </UTooltip>
          </div>
        </div>
      </div>

      <div>
        <div 
          v-if="teams_on_loading"
          class="p-12 flex items-center justify-center"
        >
          <CLoadingIcon />
        </div>

        <div v-else>
          <div 
            v-if="teams_info.length > 0"
          >
            <CTeamLeaderboard :teams="teams_info" />
          </div>

          <div v-else>
            <div class="p-12 text-center">Không có dữ liệu</div>
          </div>

        </div>
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

watch(() => chosen_season_id.value, fetch_teams, { immediate: true });

onMounted(async () => {
  all_seasons.value = await $fetch('http://localhost:8000/api/season/get_simple');

  if (all_seasons.length != 0) {
    chosen_season_id.value = all_seasons[0].id;
  } 
});

</script>