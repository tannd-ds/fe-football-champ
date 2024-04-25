<template>
  <TableBaseViewer 
    :data="team_info" 
    :columns="columns" 
    :items="items"
    table-name="team"
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

let team_info = ref({'data': []});
team_info.value = await useFetch('http://localhost:8000/api/team/get');

const columns = [
  { key: 'url_image', label: ''},
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
        team_info.value = await useFetch('http://localhost:8000/api/team/get');
      }
    }
  }]
]

let onNameClick = (row) => {
  router.push(`/team/${row.id}`);
}
</script>