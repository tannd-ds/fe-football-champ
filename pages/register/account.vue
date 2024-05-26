<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      {{ PAGE_TITLE }}
    </template>
    <template #main>
      <div class="space-y-4">
        <div class="text-sm text-zinc-400">
          Đã có tài khoản? <NuxtLink class="underline hover:text-white" to="/login">Đăng Nhập</NuxtLink>
        </div>

        <UForm 
          class="flex flex-col gap-3" 
          :state="state" 
          :schema="schema"
          @submit="handleSubmit"
        >
          <CInput
            v-model="state.user_name"
            label="Tên Người Dùng"
            name="user_name"
            autocomplete="off"
            required
          />

          <CInput
            v-model="state.user_email"
            label="Mail"
            name="user_email"
            autocomplete="off"
            required
          />

          <CInput
            v-model="state.user_password"
            label="Mật Khẩu"
            name="user_password"
            input-type="password"
            autocomplete="off"
            required
          />

          <UCheckbox
            v-model="state.is_confirm"
            name="is_confirm"
            required
          >
            <template #label>
              Chúng tôi đã đọc và đồng ý với <span class="underline">điều khoản sử dụng</span>
            </template>
          </UCheckbox>

          <div>
            <UButton type="submit">Đăng Ký</UButton>
          </div>
        </UForm>
      </div>
    </template>
  </AppForm>
</template>

<script setup>
import { z } from 'zod';

definePageMeta({
  layout: 'login',
});

const PAGE_TITLE = 'Đăng Ký';

const router = useRouter();
const route = useRoute();
const toasts = useToast();

useHead({
  title: PAGE_TITLE,
  meta: [
    {
      name: 'description',
      content: PAGE_TITLE,
    },
  ],
});

const state = ref({
  user_name: '',
  user_password: '',
  user_email: '',
  role: 0,
  is_confirm: false,
});

const handleSubmit = async () => {
  try {

    const res = await useFetch('http://localhost:8000/api/register', {
      method: 'POST',
      body: JSON.stringify(state.value),
    });

    const res_status = res.data.value.code;
    const res_content = res.data.value.content;

    if (res_status == 200) {
      toasts.add({
        title: 'Thành Công',
        description: res_content,
      });
      router.back();
    } else {
      toasts.add({
        title: 'Lỗi',
        description: res_content,
      });
    }

  } catch (error) {
    console.error(error);
  }
}

const schema = z.object({
  user_name: z.string().min(1, { message: 'Vui lòng nhập Tên người dùng'}),
  user_email: z.string().email({ message: 'Vui lòng nhập email hợp lệ'}),
  user_password: z.string().min(1, { message: 'Vui lòng nhập mật khẩu'}),
});

</script>