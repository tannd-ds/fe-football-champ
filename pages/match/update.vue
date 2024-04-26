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
        <div>Giải Đấu: {{ route.query.season_id }}</div>

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

let PAGE_TITLE = 'Tạo Trận Đấu Mới';
let fetch_api = 'http://localhost:8000/api/match/add';

useHead({
  title: PAGE_TITLE,
});


const state = ref({
  season_id: route.query.season_id,
  date: '',
  team_id_1: '',
  team_id_2: '',
});

let listteam = await useFetch(`http://localhost:8000/api/match/listteam/${route.query.season_id}`);

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