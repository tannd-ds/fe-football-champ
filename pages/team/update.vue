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
          v-model="state.name_team" 
          label="Tên Đội" 
          name="name_team" 
          required
        />

          <CInput 
            class="grow"
            input-type="date"
            v-model="state.established_date" 
            label="Ngày Thành Lập" 
            name="established_date" 
            required
          />

        <CInput 
          v-model="state.home_court" 
          label="Sân Nhà" 
          name="home_court"
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

let PAGE_TITLE = 'Thêm Đội Bóng Mới';
let fetch_api = 'http://localhost:8000/api/team/add';

const state = ref({
  name_team: '',
  established_date: '',
  home_court: '',
});

if (route.query.team_id) {
  PAGE_TITLE = 'Chỉnh Sửa Đội Bóng';
  fetch_api = 'http://localhost:8000/api/team/update/' + route.query.team_id;

  const res = await useFetch('http://localhost:8000/api/team/edit/' + route.query.team_id);

  for (const key in state.value) {
    state.value[key] = res.data.value[0][key];
  }
}

useHead({
  title: PAGE_TITLE,
  meta: [
    {
      name: 'description',
      content: PAGE_TITLE,
    }
  ]
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

    if (response.status.value == "success") {
      toasts.add({
        title: 'Thành Công',
        description: response.data,
      })

      router.push('/team');
    } else {
      toasts.add({
        title: 'Lỗi',
        description: response.data,
      })
    }

  } catch (error) {
    toasts.add({
      title: 'Lỗi',
      description: error,
    })
  }
}

const schema = z.object({
  name_team: 
    z.string()
      .min(1, { message: 'Tên đội không được để trống' }),
  established_date: 
    z.string()
      .min(1, { message: 'Ngày thành lập không được để trống' }),
  home_court: 
    z.string()
      .min(1, { message: 'Sân nhà không được để trống' }),
});
</script>