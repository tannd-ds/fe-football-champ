<template>
  <div class="w-full grid grid-cols-3 gap-4">
    <AppCard 
      class="col-span-2"
    >
      <div class="flex justify-between items-center">
        <div>
          <div class="text-3xl font-bold">Lịch Thi Đấu</div>
          <div> {{ season_name }}</div>
        </div>

        <UButton 
          color="primary"
          icon="i-heroicons-calendar-20-solid"
          label="Lên Lịch"
          @click="router.push(`/match/update?season_id=${season_id}`)"
          :disabled="!can_schedule_match"
        />
      </div>


      <div class="flex flex-col gap-4">
        <div 
          v-for="(match, match_index) in all_matches_filtered"
          class="w-full p-4 bg-zinc-800 hover:bg-zinc-700 rounded-lg cursor-pointer transition-all duration-200 ease-in-out"
        >
          <div class="w-full flex justify-between items-center">
            <div class="ml-4 flex flex-col items-center">
              <span class="font-bold text-xl">{{ match.time }}</span>
              <span class="text-zinc-400">{{ match.date_only }}</span>
            </div>

            <div class="flex justify-between space-x-4">
              <div class="font-bold font-mono text-xl">{{ match.team_1_name }}</div>
              <div>VS</div>
              <div class="font-bold font-mono text-xl">{{ match.team_2_name }}</div>
            </div>

            <div class="tracking-[0.2em]">
              <span v-if="isMatchNotPassed(match.date)">Sắp Diễn Ra</span>
              <span v-else>{{ match.team1_score }}-{{ match.team2_score }}</span>
            </div>

            <div 
              class="text-sm text-zinc-200 flex gap-2 items-center"
              @click="router.push(`/match/${match.id}`)"
            >
              <span>Chi Tiết</span>
              <UIcon name="i-heroicons-chevron-right" />
            </div>
          </div>
        </div>
        <div>{{ all_matches.data.schedule }}</div>
      </div>

    </AppCard>

    <TableBaseViewer 
      class=""
      :data="filter_teams" 
      :columns="teams_columns" 
    >
      <template #header>
        <div>Danh Sách Đội Bóng</div>
      </template>
    </TableBaseViewer>
  </div>
</template>

<script setup>

const route = useRoute();
const router = useRouter();

const season_id = route.params.id;
const season_name = 'Mùa giải ' + season_id;

let all_teams = ref({'data': []});
all_teams.value = await useFetch('http://localhost:8000/api/match/listteam/' + season_id);

const filter_teams = computed(() => {
  return {
    data: all_teams.value.data.filter(
    (team) => team.season_id == season_id
  )};
})

let all_matches = ref({'data': []});
all_matches.value = await useFetch('http://localhost:8000/api/match/' + season_id);

const all_matches_filtered = computed(() => {
  // copy all_matches data to new object
  let matches = {...all_matches.value.data};

  for (let match_index in matches) {
    let match = matches[match_index];
    let match_date = new Date(match.date);

    // Extract time from match date
    let hour = match_date.getHours();
    let minute = match_date.getMinutes() ? match_date.getMinutes() : '00';
    match.time = hour + ':' + minute;

    // Extract date from match date
    let day = match_date.getDate();
    let month = match_date.getMonth() + 1;
    let year = match_date.getFullYear();
    match.date_only = day + '/' + month + '/' + year;

    matches[match_index] = match;
  }
  return matches;
})

const can_schedule_match = computed(() => {
  return filter_teams.value.data.length >= 2;
})

const teams_columns = [
  { key: 'name_team', label: 'Đội'},
  { key: 'win', label: 'Thắng'},
  { key: 'draw', label: 'Hòa'},
  { key: 'lose', label: 'Thua'},
  { key: 'total', label: 'Điểm'}
]

function isMatchNotPassed(time) {
  let match_time = new Date(time);
  let current_time = new Date();

  return match_time > current_time;
}

</script>