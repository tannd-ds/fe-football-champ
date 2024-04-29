<template>
  <TableBaseViewer 
    :data="seasons_filtered" 
    :columns="columns" 
    :items="items"
    real-name-in-json="name_season"
    table-name="season"
    @on-name-click="onNameClick"
  >
    <template #header>
      <div class="flex justify-between">
        <div>Danh Sách Mùa Giải</div>
        <UButton 
          v-if="cookie_usr_info.role === 1"
          @click="router.push('season/update')"
          label="Thêm Mùa Giải"
          icon="i-heroicons-plus-20-solid" 
        />
      </div>
    </template>
  </TableBaseViewer>
</template>

<script setup>

const route = useRoute();
const router = useRouter();
const { value: cookie_usr_info } = useCookie('usr_info');

let seasons = ref({'data': []});
let seasons_filtered = ref(seasons.value);
let season_badge_mapper = {
  "Chưa diễn ra": 'green',
  "Đang diễn ra": 'purple',
  "Đã kết thúc": 'red',
}

async function fetch_seasons() {
  seasons.value = await useFetch('http://localhost:8000/api/season/get');
}
fetch_seasons();

watch(() => seasons.value, (val) => {
  seasons_filtered.value.data = val.data.map(season => {
    return {
      ...season,
      badge: {
        text: season.status,
        color: season_badge_mapper[season.status]
      }
    }
  });
})
  


const columns = [
  { key: 'name', label: 'Tên Mùa Giải', sortable: true}, 
  { key: 'badge', label: 'Tình Trạng'},
  { key: 'start_date', label: 'Ngày Bắt Đầu', sortable: true}, 
  { key: 'end_date', label: 'Ngày Kết Thúc', sortable: true}, 
  { key: 'quantity_team', label: 'SL Đội' }, 
]

// Only admin can edit and delete season
if (cookie_usr_info.role === 1) {
  columns.push({ key: 'actions' });
}

const items = (row) => [
  [{
    label: 'Chỉnh Sửa',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
        router.push('season/update?season_id=' + row.id);
    }
  }, {
    label: 'Xóa',
    icon: 'i-heroicons-trash-20-solid',
    click: async () => {
      if (confirm('Bạn có chắc chắn muốn xóa mùa giải này không?')) {
        const res = await useFetch('http://localhost:8000/api/season/delete/' + row.id);
        // TODO: Handle if delete fail
        fetch_seasons();
      }
    }
  }]
]

let onNameClick = (row) => {
  router.push({ 
    path: `season/${row.id}`, 
    query: route.query 
  });
}
</script>