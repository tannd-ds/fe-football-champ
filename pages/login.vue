<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      {{ PAGE_TITLE }}
    </template>
    <template #main>
      <div class="space-y-4">
        <div class="text-sm text-zinc-400">
          Chưa có tài khoản? <NuxtLink class="underline hover:text-white" to="/register/account">Đăng Ký Ngay!</NuxtLink>
        </div>

        <UForm 
          class="flex flex-col gap-3" 
          :state="state" 
          :schema="schema"
          @submit="handleSubmit"
        >
          <CInput
            v-model="state.user_email"
            label="Tài Khoản"
            name="user_email"
            autocomplete="off"
            required
          />

          <CInput
            v-model="state.user_password"
            input-type="password"
            label="Mật Khẩu"
            name="user_password"
            autocomplete="off"
            required
          >
            <template #hint>
              <div class="text-sm text-zinc-400">
                <NuxtLink class="underline hover:text-white" to="/forget_password">Quên Mật Khẩu</NuxtLink>
              </div>
            </template>
          </CInput>


          <div>
            <UButton type="submit">Đăng Nhập</UButton>
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

const PAGE_TITLE = 'Đăng Nhập';

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

  const res = await useFetch('http://localhost:8000/api/login', {
    method: 'POST',
    body: JSON.stringify(state.value),
  });

  if (res.data.value.code === 200) {
    const cookie = useCookie('auth');
    const cookie_usr_info = useCookie('usr_info');

    cookie.value = res.data.value.content.role;
    cookie_usr_info.value = res.data.value.content;
    
    toasts.add({ 
      title: 'Đăng nhập thành công', 
      description: 'Chào Mừng Bro!'
    });

    router.back();
  } else {
    toasts.add({ 
      title: 'Thất Bại', 
      description: res.data.value.content,
    });
  }
}

const schema = z.object({
  user_email: 
    z.string().email({ message: 'Email không hợp lệ'}),
  user_password: 
    z.string().min(1, { message: 'Vui lòng nhập mật khẩu'}),
});

</script>