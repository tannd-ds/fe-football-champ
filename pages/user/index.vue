<template>
  <TableBaseViewer 
    :data="user_info" 
    :columns="columns" 
    :items="items"
  >
    <template #header>
      <div class="flex justify-between">
        <div>Danh Sách Người Dùng</div>
        <UTooltip text="Thêm Người Dùng" :popper="{ placement: 'bottom-end' }">
          <UButton @click="router.push(`${route.path}/update`)">
            <UIcon name="i-heroicons-plus-20-solid" />
          </UButton>
        </UTooltip>
      </div>
    </template>
  </TableBaseViewer>
</template>

<script setup>

const route = useRoute();
const router = useRouter();

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
        const res = await useFetch('http://localhost:8000/api/user/delete/' + row.id)
        user_info.value = await fetch_users();
      }
    }
  ]
]

</script>