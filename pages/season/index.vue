<template>
  <TableBaseViewer 
    :data="seasons" 
    :columns="columns" 
    :items="items"
  >
    <template #header>
      <div class="flex justify-between">
        <div>
          Season
        </div>
        <UTooltip text="Thêm Mùa Giải" :popper="{ placement: 'bottom-end' }">
          <UButton @click="router.push('season/add')">
            <UIcon name="i-heroicons-plus-20-solid" />
          </UButton>
        </UTooltip>
      </div>
    </template>
  </TableBaseViewer>
</template>

<script setup>

const router = useRouter();

const seasons = await useFetch('http://localhost:8000/api/season');

const columns = [
  { key: 'id', label: 'ID' }, 
  { key: 'name_season', label: 'Tên Mùa Giải' }, 
  { key: 'start_date', label: 'Ngày Bắt Đầu' }, 
  { key: 'end_date', label: 'Ngày Kết Thúc' }, 
  { key: 'quantity_team', label: 'SL Đội' }, 
  { key: 'actions' }
]


const items = (row) => [
  [{
    label: 'Chỉnh Sửa',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
        router.push('season/edit/' + row.id);
    }
  }, {
    label: 'Xóa',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {
        if (confirm('Bạn có chắc chắn muốn xóa mùa giải này không?')) {
            fetch('http://localhost:8000/api/season/delete/' + row.id, {
                method: 'GET' 
            }).then(() => {
                console.log('OK');
                reloadNuxtApp({force: true});
            });
        }
    }
  }]
]
</script>