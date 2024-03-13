<template>
  <TableBaseViewer 
    :data="seasons" 
    :columns="columns" 
    :items="items"
    real-name-in-json="name_team"
    @on-name-click="onNameClick"
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
  { key: 'name', label: 'Tên Đội', sortable: true, click: (row) => console.log(row)}, 
  { key: 'quantity_soccer', label: 'SL Cầu Thủ', sortable: true}, 
  { key: 'established_date', label: 'Ngày Thành Lập' }, 
  { key: 'home_court', label: 'Sân Nhà' }, 
  { key: 'actions' }
]


const items = (row) => [
  [{
    label: 'Đăng Ký Thi Đấu',
    icon: 'i-heroicons-document-plus',
    click: () => {
      router.push('/register/into_season?team_id=' + row.id + '&team_name=' + row.name_team);
    },
    disabled: row.quantity_soccer < 15,
  }, {
    label: 'Chỉnh Sửa',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
        router.push('team/update/?team_id=' + row.id);
    }
  }, {
    label: 'Xóa',
    icon: 'i-heroicons-trash-20-solid',
    click: async () => {
      if (confirm('Bạn có chắc chắn muốn xóa đội bóng này không?')) {
        const res = await useFetch('http://localhost:8000/api/team/delete/' + row.id);
        // TODO: Handle if delete fail
        seasons.value = await useFetch('http://localhost:8000/api/team');
      }
    }
  }]
]

let onNameClick = (row) => {
  router.push(`/team/${row.id}`);
}
</script>