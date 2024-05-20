<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      {{ PAGE_TITLE }}
    </template>
    <template #main>
      <div class="space-y-4">

        <UForm 
          class="flex flex-col gap-3" 
          :state="state" 
          :schema="schema"
          @submit="handleSubmit"
        >
          <CInput
            :disabled="cookie_usr_info.role != 1"
            v-model="state.user_name"
            label="Tài Khoản"
            name="user_name"
            autocomplete="off"
            :required="!route.query.user_id"
          />

          <CInput
            :disabled="route.query.user_id"
            v-model="state.user_email"
            label="Mail"
            name="user_email"
            autocomplete="off"
            :required="!route.query.user_id"
          />

          <CInput
            v-model="state.user_password"
            label="Mật Khẩu"
            name="user_password"
            input-type="password"
            autocomplete="off"
          />

          <CSelect
            v-if="cookie_usr_info.role == 1"
            v-model="state.role"
            :options="role_options"
            label="Vai Trò"
            name="role"
          />

          <CTeamSelect 
            v-if="state.role == '0'"
            v-model="state.team_id" 
            :init-value="state.team_id"
            :null-option="true"
          />

          <div>
            <UButton type="submit">{{ route.query.user_id == null ? 'Thêm' : 'Sửa'}}</UButton>
          </div>
        </UForm>
      </div>
    </template>
  </AppForm>
</template>

<script setup>
import { z } from 'zod';

const router = useRouter();
const route = useRoute();
const toasts = useToast();
const cookie_usr_info = useCookie('usr_info');

let PAGE_TITLE = 'Tạo Tài Khoản Mới';
let fetch_api = 'http://localhost:8000/api/register';

const state = ref({
  id: '',
  user_name: '',
  user_password: '',
  user_email: '',
  role: '0',
  team_id: '',
});

const role_options = [
  { value: '0', name: 'Quản Lý Đội Bóng' },
  { value: '2', name: 'Cầu Thủ' },
];


if (route.query.user_id) {
  PAGE_TITLE = 'Chỉnh Sửa Tài Khoản';
  fetch_api = 'http://localhost:8000/api/user/update/' + route.query.user_id;

  const res = await useFetch('http://localhost:8000/api/user/edit/' + route.query.user_id);

  for (const key in state.value) {
    state.value[key] = String(res.data.value[key]);
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

const handleSubmit = async () => {
  try {

    const res = await useFetch(fetch_api, {
      method: 'POST',
      body: JSON.stringify(state.value),
    });

    const res_status = res.data.value.code;
    const res_content = res.data.value.content;

    if (res_status == 200) {
      toasts.add({
        title: 'Thành Công',
        description: res_content,
        color: 'green',
      });
      router.back();
    } else {
      toasts.add({
        title: 'Lỗi',
        description: res_content,
        color: 'red',
      });
    }

  } catch (error) {
    console.error(error);
  }
}

const schema = z.object({
  user_name: z.string().min(1, { message: 'Vui lòng nhập tài khoản'}),
  user_email: z.string().email({ message: 'Vui lòng nhập email hợp lệ'}),
  user_password: z.string().min(1, { message: 'Vui lòng nhập mật khẩu'}),
});

</script>