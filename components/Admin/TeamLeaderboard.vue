<template>
  <AppCard class="w-full h-full">
    <div class="w-full flex gap-2 overflow-auto">
      <div v-for="season in all_seasons" :key = "season.id">
        <UTooltip 
          :text="season.name_season"
          :popper="{ placement: 'top' }"
        >
          <div 
            class="mb-2 px-4 py-2 w-56 cursor-pointer border border-zinc-700 rounded-lg truncate text-center"
            :class="season.id === chosen_season_id ? 'bg-zinc-700' : 'bg-transparent'"
            @click="chosen_season_id = season.id"
            :title="season.name_season"
          >
            {{ season.name_season }}
          </div>
        </UTooltip>
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
          class="flex flex-col gap-4"
        >
          <div 
            v-for="(team, team_index) in teams_info" 
            :key="team.id"
            class="p-3 flex items-center gap-1"
          >
            <div class="font-black text-3xl w-8">{{ team_index + 1 }}</div>
            <LazyUAvatar :src="`http://localhost:8000/api/get_img/team__${team.url_image}`" />
            <div class="grow">{{ team.name_team }}</div>
            <div class="w-8">{{ team.total }}</div>
          </div>

        </div>

        <div v-else>
          <div class="p-12 text-center">Không có dữ liệu</div>
        </div>

      </div>

    </div>
  </AppCard>
</template>

<script setup>

const all_seasons = await $fetch('http://localhost:8000/api/season/get_simple');

const chosen_season_id = ref(-1);
if (all_seasons.length != 0) {
  chosen_season_id.value = all_seasons[0].id;
} 

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

</script>