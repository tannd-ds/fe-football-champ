<template>
  <div class="w-full grid grid-cols-3 gap-4">
    <AppCard 
      class="col-span-2"
    >
      <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <div class="space-y-2">
            <div class="text-3xl font-bold"> {{ season_info.name_season }}</div>
            <div>Lịch Thi Đấu</div>
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
          <CMatchItem
            v-for="(match, match_index) in all_matches_filtered"
            :match="match"
          />
        </div>
      </div>

    </AppCard>

    <TableBaseViewer 
      class=""
      :data="filter_teams" 
      :columns="teams_columns" 
      table-name="team"
    >
      <template #header>
        <div>Bảng Xếp Hạng</div>
      </template>
    </TableBaseViewer>
  </div>
</template>

<script setup>

const route = useRoute();
const router = useRouter();

const season_id = route.params.id;
const season_name = 'Mùa giải ' + season_id;

useHead({ title: `Mùa giải ${season_id}`, })

let season_info = ref({'data': []});
season_info.value = await useFetch(`http://localhost:8000/api/season/get/${season_id}`);
season_info.value = season_info.value.data[0];

let all_teams = ref({'data': []});
all_teams.value = await useFetch('http://localhost:8000/api/match/listteam/' + season_id);

const filter_teams = computed(() => {
  return {
    data: all_teams.value.data.filter(
    (team) => team.season_id == season_id
  )};
})

let all_matches = ref({'data': []});
all_matches.value = await useFetch('http://localhost:8000/api/match/get/by_season/' + season_id);

const all_matches_filtered = computed(() => {
  // copy all_matches data to new object
  let matches = {...all_matches.value.data};

  for (let match_index in matches) {
    let match = matches[match_index];
    let match_date = new Date(match.date);

    // Extract time from match date
    let hour = match_date.getHours();
    let minute = match_date.getMinutes() ? match_date.getMinutes() : '00';
    match.time = String(hour).padStart(2, '0') + ':' + String(minute).padStart(2, '0')

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
  { key: 'url_image', label: ''},
  { key: 'name_team', label: 'Đội'},
  { key: 'win', label: 'Thắng'},
  { key: 'draw', label: 'Hòa'},
  { key: 'lose', label: 'Thua'},
  { key: 'total', label: 'Điểm'}
]

</script>