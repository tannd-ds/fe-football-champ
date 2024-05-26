<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      <div class="text-center">
        {{ PAGE_TITLE }}
      </div>
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
            v-model="state.user_email"
            label="Email"
            name="user_email"
            autocomplete="off"
            required
          />

          <div class="text-sm text-zinc-400">
            <NuxtLink class="underline hover:text-white" to="/login">Trở lại trang Đăng Nhập</NuxtLink>
          </div>

          <div>
            <UButton type="submit">Đặt Lại Mật Khẩu</UButton>
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

const PAGE_TITLE = 'Đặt Lại Mật Khẩu';

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
  user_email: '',
  user_password: '',
});

const handleSubmit = async () => {
  toasts.add({ 
    title: 'Thành Công!', 
    description: 'Trở về trang Đăng Nhập...'
  });

  router.push('/login');
}

const schema = z.object({
  user_email: 
    z.string().email({ message: 'Email không hợp lệ'}),
});

</script>