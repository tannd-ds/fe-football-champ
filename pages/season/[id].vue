<template>
  <div class="w-full">
    <div class="w-full h-[98vh] grid grid-cols-3 gap-4">
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

      <div class="w-full flex flex-col gap-4">
        <TableBaseViewer 
          class="shrink"
          :data="filter_teams" 
          :columns="teams_columns" 
          table-name="team"
        >
          <template #header>
            <div>Bảng Xếp Hạng</div>
          </template>
        </TableBaseViewer>

        <UButton
          label="Đơn Đăng Ký"
          size="lg"
          icon="i-heroicons-queue-list-20-solid"
          @click="regis_pannel_is_open = true"
        />
      </div>
    </div>

    <UModal v-model="regis_pannel_is_open">
      <div class="bg-transparent">
        <TableBaseViewer 
          class="shrink"
          :data="all_regis" 
          :columns="regis_columns" 
          :items="items"
          table-name="team"
        >
          <template #header>
            <div>Đơn Đăng Ký chưa Xét Duyệt</div>
          </template>
        </TableBaseViewer>

        <UCard
        v-if="selected_regis"
        :ui="{
          base: 'h-full flex flex-col',
          rounded: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          body: {
            base: 'grow'
          }
        }"
        >
          {{ selected_regis }}
          <div class="w-full">
            <UButton
              @click="utilsRegisAccept(selected_regis)"
            >Duyệt</UButton>
            <UButton
              @click="utilsRegisReject(selected_regis)"
            >Hủy</UButton>
          </div>
        </UCard>
      </div>
    </UModal>
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

// REGISTER PANEL ------------------------------
const regis_pannel_is_open = ref(false);

let all_regis = ref({'data': []});
all_regis.value = await useFetch(`http://localhost:8000/api/season/get_registration/${season_id}`);
let selected_regis = ref({});

const regis_columns = [
  { key: 'url_image', label: '' },
  { key: 'name_team', label: 'Đội' },
  { key: 'date_signin', label: 'Ngày Đăng Ký' },
  { key: 'actions'}
]

const items = (row) => [
  [{
    label: 'Xem Đơn',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      selected_regis.value = row;
    }
  }]
]

</script>