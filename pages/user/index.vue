<template>
  <TableBaseViewer 
    :data="user_info" 
    :columns="columns" 
    :items="items"
  >
    <template #header>
      <div class="flex justify-between">
        <div>{{ PAGE_TITLE }}</div>
        <UButton 
          v-if="cookie_usr_info.role === 1"
          @click="router.push(`${route.path}/update`)"
          label="Thêm Người Dùng"
          icon="i-heroicons-plus-20-solid" 
        />
      </div>
    </template>
  </TableBaseViewer>
</template>

<script setup>

const route = useRoute();
const router = useRouter();
const toasts = useToast();
const { value: cookie_usr_info } = useCookie('usr_info');

const PAGE_TITLE = 'Danh Sách Người Dùng';
useHead({
  title: PAGE_TITLE,
});

async function fetch_users() {
  let response = await useFetch('http://localhost:8000/api/user/get_all');
  response.data.value = await processUser(response.data.value);

  return response;
}

let user_info = ref({'data': []});
user_info.value = await fetch_users();

const columns = [
  { key: 'user_name', label: 'Tên'}, 
  { key: 'user_email', label: 'Email' }, 
  { key: 'badge', label: 'Vai Trò' }, 
  { key: 'name_team', label: 'Đội bóng'},
  { key: 'actions' }
]

const items = (row) => [
  [
    {
      label: 'Chỉnh Sửa',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        router.push(`${route.path}/update/?user_id=${row.id}`);
      }
    }, {
      label: 'Xem Đội Bóng',
      icon: 'i-heroicons-eye-20-solid',
      disabled: row.team_id == null,
      click: () => {
        router.push(`/team/${row.team_id}`);
      }
    }, {
      label: 'Xóa',
      icon: 'i-heroicons-trash-20-solid',
      click: async () => {
        if (!confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) 
          return;

        const { data: res } = await useFetch('http://localhost:8000/api/user/delete/' + row.id)

        if (res.value.code == 200) {
          toasts.add({
            title: 'Thành công',
            description: 'Xóa Người dùng thành công',
            color: 'green',
          })

          user_info.value = await fetch_users();
        } else {
          toasts.add({
            title: 'Thất bại',
            description: res.value.content,
            color: 'red',
          })
        }

      }
    }
  ]
]

</script>