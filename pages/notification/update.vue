<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      {{ PAGE_TITLE }}
    </template>
    <template #main>
      <div class="mb-4 bg-yellow-300 rounded-lg">
        <div class="container mx-auto px-4 py-2 flex justify-between items-center">
          <p class="text-sm text-gray-700"><span class="font-bold">Cẩn Thận!</span> Thông báo sau khi được gửi đi sẽ không thể sửa hay thu hồi!</p>
        </div>
      </div>
      <UForm 
        class="flex flex-col gap-3" 
        :state="state" 
        :validate="validate"
        @submit="handleSubmit"
      >

        <CSelect 
          v-model="notif_type" 
          :options="notif_type_options" 
          label="Loại Thông Báo" 
          name="notif_type"
          required 
        />

        <LazyCSelect 
          v-if="notif_type == 'to_user'"
          v-model="state.user_id" 
          :options="user_options" 
          label="Chọn người nhận" 
          name="user_id"
          :multiple="notif_type == 'to_user'"
          required 
        />

        <LazyCSelect 
          v-if="notif_type == 'to_season'"
          v-model="state.season_id" 
          :options="season_options" 
          label="Chọn mùa giải cần thông báo"
          name="season_id" required 
        />

        <CInput 
          input-type="textarea"
          v-model="state.content" 
          label="Nội dung thông báo"
          name="content" 
          required 
        />
        <div>
          <UButton name="submit" size="xl" type="submit">Submit</UButton>
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

let PAGE_TITLE = 'Thêm thông báo';
let fetch_api = 'http://localhost:8000/api/notification/add';

const state = ref({
  user_id: '',
  content: '',
  season_id: '',
})

const notif_type = ref('');

let users = await useFetch('http://localhost:8000/api/user/get_all');
const user_options = users.data.value.map((user) => {
  return {
    name: user.user_name,
    value: user.id,
  }
})

let seasons = await useFetch('http://localhost:8000/api/season/get');
const season_options = seasons.data.value.map((season) => {
  return {
    name: season.name_season,
    value: season.id,
  }
})

const notif_type_options = [
  {
    name: 'Thông báo cho TẤT CẢ người dùng',
    value: 'to_all',
  },
  {
    name: 'Thông báo cho người dùng',
    value: 'to_user',
  },
  {
    name: 'Thông báo Mùa giải',
    value: 'to_season',
  }
]

const handleSubmit = async () => {
  let request_body = {
    content: state.value.content,
  };

  if (notif_type.value == 'to_user') {
    request_body.user_id = state.value.user_id;
  } else if (notif_type.value == 'to_season') {
    request_body.season_id = state.value.season_id;
  } else if (notif_type.value == 'to_all') {
    request_body.user_id = 'all';
  }

  const res = await useFetch(fetch_api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request_body),
  });

  const res_status = res.data.value.code;
  const res_content = res.data.value.content;

  if (res_status === 200) {
    toasts.add({
      title: 'Thành Công',
      description: res_content,
      color: 'green',
    });
    router.back();
  } else {
    toasts.add({
      title: 'Thất Bại',
      description: res_content,
      color: 'red',
    });
  }
}

const validate = (state)=> {
  const errors = [];

  if (!notif_type.value) {
    errors.push({
      message: 'Chưa chọn loại thông báo',
      path: 'notif_type'
    })
  }


  if (notif_type.value == 'to_user' && !state.user_id) {
    errors.push({
      message: 'Chưa chọn người nhận',
      path: 'user_id'
    })
  }

  if (notif_type.value == 'to_season' && !state.season_id) {
    errors.push({
      message: 'Chưa chọn mùa giải',
      path: 'season_id'
    })
  }

  if (!state.content) {
    errors.push({
      message: 'Nội dung thông báo không được để trống',
      path: 'content'
    })
  }

  return errors
}



</script>