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
        <AppAvatarUpload
          v-if="!route.query.team_id"
          :img_src="img_src"
          @open="open"
        />
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
// Image Upload ---------------------------------------------------------------
import { useFileDialog } from '@vueuse/core'

const img_src = ref(null);
const base64  = ref(null);

const { files, open, reset, onChange } = useFileDialog({
  accept: 'image/*', // Set to accept only image files
  directory: false, // Select directories instead of files if set true
})
onChange((files) => {
  // print image to console
  const reader = new FileReader();
  reader.onload = (e) => {
    base64.value = e.target.result;
  }
  reader.readAsDataURL(files[0]);

  img_src.value = URL.createObjectURL(files[0]);
})

async function handleSubmit() {
  try {
    // Send image to server
    const formData = new FormData();
    // append image if this page is for adding new soccer
    if (!route.query.soccer_id)
      formData.append('file', base64.value);

    // add info about who make this request (user_id)
    const { value: cookie_usr_info } = useCookie('usr_info');
    formData.append('user_id', cookie_usr_info.id);

    // append other data
    for (const key in state.value) {
      formData.append(key, state.value[key]);
    }
    const response = await useFetch(fetch_api, {
      method: 'POST',
      body: formData,
    });

    if (response.data.value.code == 200) {
      toasts.add({
        title: 'Thành Công',
        description: response.data.value.content,
        color: 'green',
      })

      // Update team_id to cookie
      if (!cookie_usr_info.team_id) {
        cookie_usr_info.team_id = response.data.value.team_id;
        useCookie('usr_info', cookie_usr_info);
      }

      router.back();
    } else {
      toasts.add({
        title: 'Lỗi',
        description: response.data.value.content,
        color: 'red',
      })
    }

  } catch (error) {
    toasts.add({
      title: 'Lỗi',
      description: error,
      color: 'red',
    })
  }
}

const schema = z.object({
  name_team: 
    z.string()
      .min(1, { message: 'Tên đội không được để trống' }),
  established_date: 
    z.string()
      .min(1, { message: 'Ngày thành lập không được để trống' })
      .refine(
        (date) => new Date(date) < new Date(), 
        { message: 'Ngày thành lập không được lớn hơn ngày hiện tại' }
      ),
  home_court: 
    z.string()
      .min(1, { message: 'Sân nhà không được để trống' }),
});
</script>