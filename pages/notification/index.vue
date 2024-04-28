<template>
    <TableBaseViewer 
      :data="notification_info" 
      :columns="columns" 
      :items="items"
     
    >
      <template #header>
        <div class="flex justify-between">
          <div>Danh sách thông báo</div>
          <UTooltip text="Thêm thông báo" :popper="{ placement: 'bottom-end' }">
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
 
    let notification_info = ref({'data': []});
    async function fetch_notifications() {
      notification_info.value = await useFetch('http://localhost:8000/api/notification/get_all');
}
fetch_notifications();
const columns = [
    { key: 'user_name', label: 'Tên người nhận'}, 
    { key:  'time', label: 'Thời gian gửi' },
    { key: 'content', label: 'Nội dung thông báo' }, 
    { key: 'actions' }
  ]
  
  const items = (row) => [
    [
      {
        label: 'Chỉnh Sửa',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => {
          router.push(`${route.path}/update/?id=${row.id}`);
        }
      }, 
       {
        label: 'Xóa',
        icon: 'i-heroicons-trash-20-solid',
        click: async () => {
          if (!confirm('Bạn có chắc chắn muốn xóa thông báo này không?')) 
            return;
          const res = await useFetch('http://localhost:8000/api/notification/delete/' + row.id)
          notification_info.value = await fetch_notifications();
        }
      }
    ]
  ]
 
  </script>