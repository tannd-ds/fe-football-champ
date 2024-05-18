<template>
  <div>
    <UDropdown 
      :items="usr_btns"
      :popper="{ 
        placement: 'top',
        offsetDistance: 12,
      }"
      mode="hover"
    >

      <UButton 
        size="lg"
        color="white" 
        label="Tài Khoản" 
        trailing-icon="i-heroicons-user-20-solid" 
      />

      <template #account="{ item }">
        <div class="text-left w-full">
          <p> Xin Chào, </p>
          <p class="truncate font-medium text-white">{{ item.label }}</p>
        </div>
      </template>
    
    </UDropdown>
    
  </div>
</template>

<script setup>
const router = useRouter();
const toasts = useToast();
const cookie_usr_info = useCookie('usr_info');

const usr_btns = [
  [{
    // label: cookie_usr_info.value.user_name,
    label: cookie_usr_info.value?.user_name || 'user',
    slot: 'account',
    disabled: true,
  }], [{
    label: 'Chỉnh Sửa Tài Khoản',
    icon: 'i-heroicons-cog-8-tooth',
    click: () => router.push({
      path: '/user/update/',
      query: {
        user_id: cookie_usr_info.value.id
      }
    })
  }], [{
    label: 'Đăng Xuất',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: () => logout(),
  }],
]

const logout = () => {
  if (!confirm('Bạn có chắc chắn muốn đăng xuất?') ) return;

  try {
    const cookie = useCookie('auth');
    cookie.value = null;
    cookie_usr_info.value = null;

    toasts.add({ 
      title: 'Đăng xuất thành công', 
      description: 'Hẹn gặp lại bạn!'
    });

    router.push('/login');
  } catch (error) {
    toasts.add({ 
      title: 'Thất Bại', 
      description: 'Đăng xuất không thành công'
    });
  }
}
</script>