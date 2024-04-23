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

        <button type="button" @click="open">
          Choose file
        </button>

        <!-- display img uploaded here-->
        <img :src="soccer_src" alt="soccer_img" class="w-32 h-32" />

        <CInput
          v-model="state.name_soccer"
          label="Tên Cầu Thủ"
          name="name_soccer"
          required
        />

        <CSelect
          v-model="state.team_id"
          :options="team_options"
          label="Đội Bóng"
          name="team_id"
        />

        <div class="w-full flex gap-4 items-stretch">
          <CInput
            class="grow"
            input-type="date"
            v-model="state.birthday"
            label="Sinh Nhật"
            name="birthday"
            required
          />

          <CSelect
            class="grow"
            v-model="state.category"
            :options="category_options"
            label="Loại Cầu Thủ"
            name="category"
            required
          />
        </div>

        <div>{{ state }}</div>

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

let PAGE_TITLE = 'Thêm Cầu Thủ Mới';
let fetch_api = 'http://localhost:8000/api/soccer/add';

const state = ref({
  name_soccer: '',
  birthday: '',
  category: '',
  team_id: '',
});

if (route.query.soccer_id) {
  PAGE_TITLE = 'Chỉnh Sửa Cầu Thủ';
  fetch_api = 'http://localhost:8000/api/soccer/update/' + route.query.soccer_id;

  const res = await useFetch('http://localhost:8000/api/soccer/edit/' + route.query.soccer_id);

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

const category_options = [
  { name: 'Trong Nước', value: 0, },
  { name: 'Nước Ngoài', value: 1, },
]

const team_list = await useFetch('http://localhost:8000/api/team/get');
const team_options = team_list.data.value.map((team) => {
  return {
    name: team.name_team,
    value: team.id,
  }
})

// Image Upload ---------------------------------------------------------------
import { useFileDialog } from '@vueuse/core'

const soccer_src = ref(null);
const base64  = ref(null);

const { files, open, reset, onChange } = useFileDialog({
  accept: 'image/*', // Set to accept only image files
  directory: false, // Select directories instead of files if set true
})

onChange((files) => {
  // print image to console
  const reader = new FileReader();
  reader.onload = (e) => {
    console.log(e.target.result);
    base64.value = e.target.result;
  }
  reader.readAsDataURL(files[0]);

  console.log(URL.createObjectURL(files[0]));
  soccer_src.value = URL.createObjectURL(files[0]);

})


async function handleSubmit() {
  try {
    // Send image to server
    const formData = new FormData();
    formData.append('file', base64.value);

    // append other data
    for (const key in state.value) {
      formData.append(key, state.value[key]);
    }

    const response_img = await useFetch('http://localhost:8000/api/soccer/add', {
      method: 'POST',
      body: formData,
    });

    if (response_img.status.value == "success") {
      toasts.add({
        title: 'Thành Công',
        description: response_img.data,
      });
    } else {
      toasts.add({
        title: 'Lỗi',
        description: response_img.data,
      });
    }
    // const response = await useFetch(fetch_api, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(state.value),
    // });

    // if (response.status.value == "success") {
    //   toasts.add({
    //     title: 'Thành Công',
    //     description: response.data,
    //   });

    //   router.push('/soccer');
    // } else {
    //   toasts.add({
    //     title: 'Lỗi',
    //     description: response.data,
    //   });
    // }

  } catch (error) {
    console.error(error);
  }
}

const schema = z.object({
  name_soccer: 
    z.string()
      .min(1, { message: 'Tên Cầu Thủ không được để trống' }),
  birthday: 
    z.string()
      .min(1, { message: 'Sinh Nhật không được để trống' })
      .refine((val) => {
        const birthday = new Date(val).getFullYear();
        const today = new Date().getFullYear();
        return today - birthday >= 18
      }, { message: 'Cầu Thủ phải từ 18 tuổi trở lên' }).
      refine((val) => {
        const birthday = new Date(val).getFullYear();
        const today = new Date().getFullYear();
        return today - birthday <= 40
      }, { message: 'Cầu Thủ không được quá 40 tuổi' }),
  category: 
    z.string()
      .min(1, { message: 'Loại Cầu Thủ không được để trống' }),
});
</script>