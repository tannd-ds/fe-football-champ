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
        @submit="handleSubmit"
      >
        <div>Trận: {{ match_details.team_1_name }} vs. {{ match_details.team_2_name }}</div>

        <CSelect
          v-model="state.team_id"
          :options="listteam_options"
          label="Đội Bóng"
          name="team_id"
          required
        />

        <CSelect
          v-model="state.soccer_id"
          :options="soccers_options"
          label="Cầu Thủ"
          name="soccer_id"
          required
        />

        <CInput
          v-model="state.category_goal"
          label="Loại Bàn Thắng"
          name="category_goal"
          required
        />

        <CInput
          v-model="state.time_goal"
          label="Thời Điểm"
          name="time_goal"
          input-type="number"
          required
        />

        <div>
          <UButton type="submit">Submit</UButton>
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

let PAGE_TITLE = 'Thêm Thông Tin Trận Đấu';
let fetch_api = 'http://localhost:8000/api/match/add';

useHead({
  title: PAGE_TITLE,
});


const state = ref({
  schedule_id: route.query.schedule_id,
  soccer_id: '',
  team_id: '',
  category_goal: '',
  time_goal: '',
});


// Get match details
let match_details = ref({});
match_details.value = await useFetch(`http://localhost:8000/api/match/get/by_schedule/${route.query.schedule_id}`);
match_details.value = match_details.value.data[0];

const listteam_options = computed(() => {
  return [
    {
      name: match_details.value.team_1_name,
      value: match_details.value.team_id_1,
    },
    {
      name: match_details.value.team_2_name,
      value: match_details.value.team_id_2,
    }
  ]
})

// List soccer options
const soccers_options = ref([]);

watch(() => state.value.team_id, async (team_id) => {
  if (team_id) {
    let soccers = await useFetch(`http://localhost:8000/api/team/get/${team_id}`);
    soccers = soccers.data.value.team_soccer;
    soccers_options.value = soccers.map((soccer) => {
      return {
        name: soccer.name_soccer,
        value: soccer.id,
      }
    })
  } else {
    soccers_options.value = [];
  }
})

const handleSubmit = async () => {
  const res = await useFetch('http://localhost:8000/api/match/detailschedule/add', {
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

// Validation
// Convert max_time_match from hh:mm:ss to minutes
let time_splits = String(match_details.value.max_time_match).split(':');
time_splits = parseInt(time_splits[0]) * 60 + parseInt(time_splits[1]);

const schema = z.object({
  category_goal: z.string(),
  // Time goal has to be between 0 and max_time_match
  time_goal: z.string()
    .refine(val => {
      return parseInt(val) >= 0 && parseInt(val) <= time_splits;
    }, 'Thời điểm không hợp lệ')
})

</script>