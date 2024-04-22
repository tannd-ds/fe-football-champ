<template>
  <TableBaseViewer 
    :data="seasons" 
    :columns="columns" 
    :items="items"
    real-name-in-json="name_soccer"
    @on-name-click="onNameClick"
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

const team_list = await useFetch('http://localhost:8000/api/team/get');
const team_mapper = team_list.data.value.reduce((acc, team) => {
  acc[team.id] = team.name_team;
  return acc;
}, {});

let seasons = ref({'data': []});
seasons.value = await useFetch('http://localhost:8000/api/soccer');
for (const season of seasons.value.data) {
  season.category_text = 
    (season.category === 0) 
      ? 'Trong Nước' 
      : 'Nước Ngoài';  

  if (season.team_id === null) {
    season.team_name = 'Chưa Có Đội Bóng';
  } else { 
    season.team_name = team_mapper[season.team_id];
  }
}

const columns = [
  { key: 'name', label: 'Tên', sortable: true}, 
  { key: 'birthday', label: 'Ngày Sinh', sortable: true}, 
  { key: 'category_text', label: 'Loại Cầu Thủ', sortable: true}, 
  { key: 'team_name', label: 'Đội Bóng', sortable: true}, 
  { key: 'actions' },
]

const items = (row) => [
  [{
    label: 'Chỉnh Sửa',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      router.push('/soccer/update?soccer_id=' + row.id);
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

let onNameClick = (row) => {
  router.push('/soccer/detail/' + row.id);
}
</script>