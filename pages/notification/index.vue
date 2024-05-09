<template>
    <TableBaseViewer 
      :data="notification_info" 
      :columns="columns" 
      :items="items"
      :use-small-text="true"
      :wrap-lines="true"
    >
      <template #header>
        <div class="flex justify-between">
          <div>Danh sách thông báo</div>
          <UButton 
            v-if="cookie_usr_info.role === 1"
            @click="router.push(`${route.path}/update`)"
            label="Thêm thông báo"
            icon="i-heroicons-plus-20-solid" 
          />
        </div>
      </template>
    </TableBaseViewer>
  </template>
  
<script setup>

const route = useRoute();
const router = useRouter();
const toasts= useToast();
const { value: cookie_usr_info } = useCookie('usr_info');

useHead({
  title: 'Danh sách thông báo',
});

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
      label: 'Xóa',
      icon: 'i-heroicons-trash-20-solid',
      click: async () => {
        if (confirm('Bạn có chắc chắn muốn xóa thông báo này không?')) {
          const res = await useFetch('http://localhost:8000/api/notification/delete/' + row.id);

          // TODO: Handle if delete fail
          const res_status = res.data.value.code;
          const res_content = res.data.value.content;
          if (res_status === 200) {
            toasts.add({
              title: 'Xóa thành Công',
              description: res_content,
            });
            router.replace();
          } else {
            toasts.add({
              title: 'Thất Bại',
              description: res_content,
            });
          }
          fetch_notifications();
        }
      }
  }

  ]
]

</script>