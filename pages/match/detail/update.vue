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
        <div>Trận: {{ route.query.schedule_id }}</div>

        <CSelect
          v-model="state.team_id"
          :options="listteam_options"
          label="Đội Bóng"
          name="team_id"
          required
        />

        <CInput
          v-model="state.category_goal"
          label="Loại Bàn Thắng"
          name="category_goal"
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

let listteam = await useFetch(`http://localhost:8000/api/match/listteam/${route.query.schedule_id}`);

const listteam_options = computed(() => {
  return listteam.data.value.map((team) => {
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
      .min(1, { message: 'Thời gian không được để trống' })
      .refine(
        data => new Date(data) > new Date(),
        { message: 'Thời gian không được nhỏ hơn hiện tại' }
      )
}).refine(
  data => data.team_id_1 !== data.team_id_2, {
    message: '2 đội không được giống nhau',
  }
);

console.log(schema);
</script>