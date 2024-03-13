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
            v-model="state.username"
            label="Tài Khoản"
            name="username"
            autocomplete="off"
            required
          />

          <CInput
            v-model="state.password"
            label="Mật Khẩu"
            name="password"
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
  username: '',
  password: '',
  is_confirm: false,
});

const handleSubmit = async () => {
  if (state.value.username === 'admin' && state.value.password === 'admin') {
    const cookie = useCookie('auth');

    cookie.value = 1;
    toasts.add({ 
      title: 'Đăng nhập thành công', 
      description: 'Chào Mừng Bro!'
    });

    router.back();
  } else {
    toasts.add({ 
      title: 'Thất Bại', 
      description: 'Tên Tài Khoản hoặc Mật Khẩu không đúng'
    });
  }
}

const schema = z.object({
  username: z.string().min(1, { message: 'Vui lòng nhập tài khoản'}),
  password: z.string().min(1, { message: 'Vui lòng nhập mật khẩu'}),
});

</script>