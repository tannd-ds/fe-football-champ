<template>
  <TableBaseViewer 
    :data="seasons" 
    :columns="columns" 
    :items="items"
  >
    <template #header>
      <div class="flex justify-between">
        <div>{{ PAGE_TITLE }}</div>
        <UTooltip text="Thêm Trận Đấu" :popper="{ placement: 'bottom-end' }">
          <UButton @click="router.push('match/update')">
            <UIcon name="i-heroicons-plus-20-solid" />
          </UButton>
        </UTooltip>
      </div>
    </template>
  </TableBaseViewer>
</template>

<script setup>

const PAGE_TITLE = 'Danh Sách Trận Đấu';

useHead({
  title: PAGE_TITLE,
})

const router = useRouter();

let seasons = ref({'data': []});
seasons.value = await useFetch('http://localhost:8000/api/match/1');

const columns = [
  { key: 'id', label: 'ID', sortable: true},
  { key: 'season_id', label: 'Mùa Giải', sortable: true},
  { key: 'date', label: 'Ngày', sortable: true},
  { key: 'team_id_1', label: 'Đội 1', sortable: true},
  { key: 'team_id_2', label: 'Đội 2', sortable: true},
  { key: 'team1_score', label: 'Điểm Đội 1', sortable: true},
  { key: 'team2_score', label: 'Điểm Đội 2', sortable: true},
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
      if (confirm('Bạn có chắc chắn muốn xóa đội bóng này không?')) {
        const res = await useFetch('http://localhost:8000/api/team/delete/' + row.id);
        // TODO: Handle if delete fail
        seasons.value = await useFetch('http://localhost:8000/api/team');
      }
    }
  }]
]
</script>