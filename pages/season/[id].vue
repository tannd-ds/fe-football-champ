<template>
  <div class="w-full">
    <div class="w-full h-[96vh] grid grid-cols-3 gap-4">
      <LazyAppCard 
        class="col-span-2 h-[96vh]"
      >
        <div class="h-full flex flex-col gap-4">
          <div class="flex justify-between items-center">
            <div class="space-y-2">
              <div class="flex gap-4 items-end">
                <span class="text-3xl font-bold"> 
                  {{ season_info.name_season }}
                </span>
                <LazyCSeasonDetail :detail="season_info"/>
              </div>
              <div class="text-gray-500">Vietnam • {{ season_info.start_date }}</div>
            </div>

            <div 
              v-if="cookie_usr_info.role === 1"
              class="flex flex-col gap-2"
            >
              <CSeasonAdminDropdown />
            </div>
            <UButton 
              v-else
              color="primary"
              icon="i-heroicons-calendar-20-solid"
              label="Đăng Ký Thi Đấu"
              @click="regis_to_season()"
            />
          </div>

          <div class="grow flex overflow-auto">
            <CSeasonTabsContainer />
          </div>
        </div>

      </LazyAppCard>

      <div class="w-full h-[96vh] overflow-auto flex flex-col gap-4">

        <div 
          :class="[cookie_usr_info.role == 1 ? 'h-[30vh]' : 'h-[37vh]']"
        >
          <CSeasonNews :season_id="route.params.id"/>
        </div>

        <div class="h-[58vh]">
          <CSeasonLeaderboard 
            :teams="filter_teams"
            :loading="all_teams_loading"
          />  
        </div>

        <div class="w-full flex flex-col card-fade-in" 
          :style="{ animationDelay: `${general_store.n_elements *0.128}s`}"
        >
          <UButton
            v-if="cookie_usr_info.role === 1"
            label="Đơn Đăng Ký"
            size="lg"
            icon="i-heroicons-inbox-stack-20-solid"
            @click="regis_pannel_is_open = true"
            :disabled="all_regis.length == 0"
          >
            <template #trailing>
                <span 
                  v-if="all_regis.length"
                  class="
                    py-1 px-1 min-w-[24px] min-h-[24px] grid place-items-center 
                    rounded-full bg-red-500 text-xs font-medium leading-none text-white content-['']
                  "
                >
                  {{ all_regis.length }}
                </span>
              </template>
          </UButton>
        </div>
      </div>
    </div>

    <LazyUModal 
      v-model="regis_pannel_is_open"
      fullscreen
      :ui="{
        background: 'bg-transparent dark:bg-transparent',
      }"
    >
      <!-- close button -->
      <UButton
        class="absolute top-4 right-4"
        icon="i-heroicons-x-mark-20-solid"
        variant="soft"
        size="xl"
        color="red"
        @click="regis_pannel_is_open = false"
      />

      <div class="w-full h-full flex items-center justify-center">
        <div class="w-[75vw] h-full max-h-[70vh] flex gap-8">
          <TableBaseViewer 
            class="w-1/2"
            :data="all_regis" 
            :columns="regis_columns" 
            :items="items"
            table-name="team"
          >
            <template #header>
              <div>Đơn Đăng Ký chưa Xét Duyệt</div>
            </template>
          </TableBaseViewer>

          <AppCard class="w-1/2">
            <div v-if="selected_regis.listteam_id">
              <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2 items-center">
                  <LazyUAvatar :src="`http://localhost:8000/api/get_img/team__${selected_regis.url_image}`" />
                  <div class="text-xl font-bold">{{ selected_regis.name_team }}</div>
                </div>
                <div class="text-base font-normal">
                  <div class="flex flex-col gap-1">
                    <div>
                      <span class="font-bold">Ngày Thành Lập:</span> {{ selected_regis.established_date }}
                    </div>
                    <div>
                      <span class="font-bold">Sân Nhà:</span> {{ selected_regis.home_court }}
                    </div>
                    <div>
                      <span class="font-bold">Số Lượng Cầu Thủ:</span> {{ selected_regis.quantity_soccer }}
                    </div>
                    <div>
                      <span class="font-bold">Ngày Đăng Ký</span> {{ selected_regis.date_signin }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="w-full flex justify-center items-center gap-4">
                <UButton
                  @click="accept_regis(selected_regis)"
                >Duyệt</UButton>
                <UButton
                  @click="reject_regis(selected_regis)"
                  color="red"
                >Từ Chối</UButton>
              </div>
            </div>

            <div 
              v-else
              class="w-full h-full flex items-center justify-center"
            >
              <div class="flex flex-col gap-4 items-center text-gray-600">
                <UIcon name="i-heroicons-queue-list-20-solid" class="text-6xl" />
                <div class="text-3xl font-bold text-center">Thông Tin Đội Bóng Đăng Ký</div>
                <div class="text-center">Chọn một đơn đăng ký để xem chi tiết và xét duyệt</div>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </LazyUModal>
  </div>
</template>

<script setup>

import { useGeneralStore } from '~/stores/generalStore';
const general_store = useGeneralStore();

const route = useRoute();
const router = useRouter();
const toasts = useToast();
const { value: cookie_usr_info } = useCookie('usr_info');

const season_id = route.params.id;

let season_info = ref({'data': []});
const all_teams = ref([]);

const all_teams_loading = ref(true);

const filter_teams = computed(() => {
  return all_teams.value.filter(
    (team) => team.season_id == season_id && team.name_team != null
  );
})

// REGISTER PANEL ------------------------------
const regis_pannel_is_open = ref(false);

let all_regis = ref({'data': []});
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

const regis_response = ref({});

const accept_regis = async (regis) => {
  regis_response.value = await utilsRegisAccept(regis);
}

const reject_regis = async (regis) => {
  regis_response.value = await utilsRegisReject(regis);
}

watch(() => regis_response.value, async (newVal) => {
  if (newVal.value.code == 200) {
    all_regis.value = await useFetch(`http://localhost:8000/api/season/get_registration/${season_id}`);
    selected_regis.value = {};
    toasts.add({
      title: 'Thành Công',
      description: newVal.value.content,
    });
  } else {
    toasts.add({
      title: 'Thất Bại',
      description: newVal.value.content,
      color: 'red'
    });
  }
})

const regis_to_season = () => {
  if (new Date(season_info.value.start_date) < new Date()) {
    toasts.add({
      title: 'Thất Bại',
      description: 'Mùa Giải này đã hết hạn đăng ký.',
      color: 'red'
    });
    return;
  }

  if (cookie_usr_info.team_id) {
    // check if team already in season
    for (let team of filter_teams.value) {
      if (team.team_id == cookie_usr_info.team_id) {
        toasts.add({
          title: 'Thất Bại',
          description: 'Đội của bạn đã tham gia mùa giải này.',
          color: 'yellow'
        });
        return;
      }
    }

    router.push({
      path: `/register/into_season`,
      query: {
        team_id: cookie_usr_info.team_id,
        season_id: season_id,
      }
    })
  } else {
    toasts.add({
      title: 'Thất Bại',
      description: 'Bạn chưa có đội bóng để đăng ký.',
      color: 'red'
    })
  }
}

onMounted(async () => {
  // get season info
  const season_data = ref(null)
  while (!season_data.value) {
    let { data } = await useFetch(`http://localhost:8000/api/season/get/${season_id}`);
    season_data.value = data.value;
    await nextTick();
  }
  season_info.value = season_data.value[0];

  useHead({ title: season_info.value.name_season }); // set page title

  // get all teams in season
  const leaderboard_teams_data = ref(null);
  while (!leaderboard_teams_data.value) {
    const { data } = await useFetch('http://localhost:8000/api/match/listteam/' + season_id);
    leaderboard_teams_data.value = data.value;
    await nextTick();
  }
  all_teams.value = leaderboard_teams_data.value;
  all_teams_loading.value = false;

  // get all registration
  const all_regis_data = ref(null);
  while (!all_regis_data.value) {
    const { data } = await useFetch(`http://localhost:8000/api/season/get_registration/${season_id}`);
    all_regis_data.value = data.value;
    await nextTick();
  }
  all_regis.value = all_regis_data.value;
})
</script>