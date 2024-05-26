<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      {{ PAGE_TITLE }}
    </template>
    <template #main>
      <UForm 
        class="flex flex-col gap-3" 
        :state="state" 
        :schema="schema"
        :validate="validate"
        @submit="handleSubmit"
      >
        <div>Mùa Giải: {{ season_info.name_season }}</div>

        <div class="flex flex-col items-center gap-4">
          <span class="font-bold">Chọn 2 đội đấu</span>

          <div class="grid grid-cols-7 gap-2 justify-items-stretch w-full">
            <CSelect
              class="col-span-3"
              v-model="state.team_id_1"
              :options="listteam_options"
              name="team_id_1"
              required
            />

            <span class="text-center">VS</span>

            <CSelect
              class="col-span-3"
              v-model="state.team_id_2"
              :options="listteam_options"
              name="team_id_2"
              required
            />
          </div>
        </div>

        <CInput 
          class="grow"
          input-type="datetime-local"
          v-model="state.date" 
          label="Thời Gian Thi Đấu" 
          name="date" 
        />

        <CInput 
          class="grow"
          input-type="number"
          v-model="state.round" 
          label="Vòng Đấu" 
          name="round" 
        />

        <div>
          <UButton type="submit">OK</UButton>
        </div>
      </UForm>
    </template>
  </AppForm>
</template>

<script setup>

import { z } from 'zod';

const route = useRoute();
const router = useRouter();
const toasts = useToast();

let PAGE_TITLE = 'Tạo Trận Đấu Mới';
let fetch_api = 'http://localhost:8000/api/match/add';

useHead({
  title: PAGE_TITLE,
});

const state = ref({
  season_id: route.query.season_id,
  date: '',
  round: '',
  team_id_1: '',
  team_id_2: '',
});

const season_info = ref({});
const listteam = ref([]);

const listteam_options = computed(() => {
  return listteam.value.map((team) => {
    let is_disabled = (team.team_id == state.value.team_id_1 || team.team_id == state.value.team_id_2);
    return {
      name: team.name_team,
      value: team.team_id,
      disabled: is_disabled,
    }
  })
})

const handleSubmit = async () => {
  const res = await useFetch('http://localhost:8000/api/match/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(state.value),
  });

  const res_status = res.data.value.code;
  const res_content = res.data.value.content;

  if (res_status === 200) {
    toasts.add({
      title: 'Thành Công',
      description: res_content,
    });
    router.back();
  } else {
    toasts.add({
      title: 'Thất Bại',
      description: res_content,
    });
  }
}

const schema = z.object({
  season_id: 
    z.string().min(1, { message: 'Mùa giải không được để trống' }),
  team_id_1:
    z.string().min(1, { message: 'Chọn 1 Đội Thi Đấu' }),
  team_id_2:
    z.string().min(1, { message: 'Chọn 1 Đội Thi Đấu' }),
  date:
    z.string()
});

const validate = (state) => {
  const errors = [];
  const team_id_1 = state.team_id_1;
  const team_id_2 = state.team_id_2;

  if (team_id_1 === team_id_2) {
    errors.push({
      message: '2 đội không được giống nhau',
      path: 'team_id_2'
    });
  }

  // make sure the date is in range of the season
  const season_start = new Date(season_info.value.start_date);
  const season_end = new Date(season_info.value.end_date);
  const match_date = new Date(state.date);

  if (match_date < season_start || match_date > season_end) {
    errors.push({
      message: 'Thời gian thi đấu không nằm trong mùa giải',
      path: 'date'
    });
  }

  return errors;
}

onMounted(async () => {
  const { data: season_data } = await useFetch(`http://localhost:8000/api/season/get/${route.query.season_id}`);
  season_info.value = season_data.value[0];

  const { data: listteam_data } = await useFetch(`http://localhost:8000/api/match/listteam/${route.query.season_id}`);
  listteam.value = listteam_data.value;
});
</script>