<template>
  <TableBaseViewer 
    :data="seasons" 
    :columns="columns" 
    :items="items"
  >
    <template #header>
      <div class="flex justify-between">
        <div>Danh Sách Cầu Thủ</div>
        <UTooltip text="Thêm Cầu Thủ" :popper="{ placement: 'bottom-end' }">
          <UButton @click="router.push('soccer/update')">
            <UIcon name="i-heroicons-plus-20-solid" />
          </UButton>
        </UTooltip>
      </div>
    </template>
  </TableBaseViewer>
</template>

<script setup>

const router = useRouter();

let seasons = ref({'data': []});
seasons.value = await useFetch('http://localhost:8000/api/soccer');

const columns = [
  { key: 'name_soccer', label: 'Tên', sortable: true}, 
  { key: 'birthday', label: 'Ngày Sinh', sortable: true}, 
  { key: 'category', label: 'Loại Cầu Thủ', sortable: true}, 
  { key: 'team_id', label: 'Mã Đội Bóng', sortable: true}, 
  { key: 'actions' },
]

const items = (row) => [
  [{
    label: 'Chỉnh Sửa',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      router.push('soccer/update?soccer_id=' + row.id);
    }
  }, {
    label: 'Xóa',
    icon: 'i-heroicons-trash-20-solid',
    click: async () => {
      if (confirm('Bạn có chắc chắn muốn xóa mùa giải này không?')) {
        const res = await useFetch('http://localhost:8000/api/soccer/delete/' + row.id);
        // TODO: Handle if delete fail
        seasons.value = await useFetch('http://localhost:8000/api/soccer');
      }
    }
  }]
]
</script>