<template>
  <TableBaseViewer 
    :data="seasons" 
    :columns="columns" 
    :items="items"
  >
    <template #header>
      <div class="flex justify-between">
        <div>Danh Sách Đội Bóng</div>
        <UTooltip text="Thêm Đội Bóng" :popper="{ placement: 'bottom-end' }">
          <UButton @click="router.push('team/update')">
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
seasons.value = await useFetch('http://localhost:8000/api/team');

const columns = [
  { key: 'url_image', label: ''}, 
  { key: 'name_team', label: 'Tên Đội', sortable: true}, 
  { key: 'quantity_soccer', label: 'SL Cầu Thủ', sortable: true}, 
  { key: 'established_date', label: 'Ngày Thành Lập' }, 
  { key: 'home_court', label: 'Sân Nhà' }, 
  { key: 'actions' }
]


const items = (row) => [
  [{
    label: 'Chỉnh Sửa',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
        router.push('team/update/?team_id=' + row.id);
    }
  }, {
    label: 'Xóa',
    icon: 'i-heroicons-trash-20-solid',
    click: async () => {
      if (confirm('Bạn có chắc chắn muốn xóa mùa giải này không?')) {
        const res = await useFetch('http://localhost:8000/api/team/delete/' + row.id);
        // TODO: Handle if delete fail
        seasons.value = await useFetch('http://localhost:8000/api/team');
      }
    }
  }]
]
</script>