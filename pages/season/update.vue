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
        <CInput
          v-model="state.name_season"
          label="Tên Mùa Giải"
          name="name_season"
          required
        />

        <div class="w-full flex gap-4 items-stretch">
          <CInput
            class="grow"
            v-model="state.start_date"
            label="Ngày Bắt Đầu"
            name="start_date"
            input-type="date"
            required
          />

          <CInput
            class="grow"
            v-model="state.end_date"
            label="Ngày Kết Thúc"
            name="end_date"
            input-type="date"
            required
          />
        </div>

        <CInput
          v-model="state.quantity_team"
          label="Số Lượng Đội"
          name="quantity_team"
          input-type="number"
          required
        />

        <div>
          <UButton size="xl" type="submit">Submit</UButton>
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

let PAGE_TITLE = 'Thêm Mùa Giải Mới';
let fetch_api = 'http://localhost:8000/api/season/add';

const state = ref({
  name_season: '',
  start_date: '',
  end_date: '',
  quantity_team: '',
});

if (route.query.season_id) {
  PAGE_TITLE = 'Chỉnh Sửa Mùa Giải';
  fetch_api = 'http://localhost:8000/api/season/update/' + route.query.season_id;

  const res = await useFetch('http://localhost:8000/api/season/edit/' + route.query.season_id);

  for (const key in state.value) {
    state.value[key] = String(res.data.value[0][key]);
  }
}

useHead({
  title: PAGE_TITLE,
  meta: [
    {
      name: 'description',
      content: PAGE_TITLE,
    },
  ],
});

async function handleSubmit() {
  try {
    const response = await useFetch(fetch_api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state.value),
    });

    const res_status = response.data.value.code;
    const res_content = response.data.value.content;

    if (res_status === 200) {
      toasts.add({
        title: 'Thành Công',
        description: res_content,
      });

      router.push('/season');
    } else {
      toasts.add({
        title: 'Lỗi',
        description: response.data,
        type: 'error',
      });
    }

  } catch (error) {
    console.error(error);
  }

}

const schema = z.object({
  name_season: 
    z.string()
      .min(1, { message: 'Tên mùa giải không được để trống' }),
  start_date: 
    z.string()
      .min(1, { message: 'Ngày bắt đầu không được để trống' }),
  end_date: 
    z.string()
      .min(1, { message: 'Ngày kết thúc không được để trống' }),
  quantity_team: 
    z.string()
      .min(1, { message: 'Số lượng đội không được để trống' }),
});

</script>