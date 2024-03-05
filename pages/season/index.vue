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
  { key: 'start_day', label: 'Ngày Bắt Đầu' }, 
  { key: 'end_day', label: 'Ngày Kết Thúc' }, 
  { key: 'quatity_team', label: 'SL Đội' }, 
  { key: 'actions' }
]


const items = (row) => [
  [{
    label: 'Chỉnh Sửa',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id)
  }, {
    label: 'Xóa',
    icon: 'i-heroicons-trash-20-solid'
  }]
]
</script>