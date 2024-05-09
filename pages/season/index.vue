<template>
  <TableBaseViewer 
    :data="{data: seasons_filtered}" 
    :columns="columns" 
    :items="items"
    real-name-in-json="name_season"
    table-name="season"
    @on-name-click="onNameClick"
  >
    <template #header>
      <div>
        <div class="flex justify-between">
          <div>Danh Sách Mùa Giải</div>
          <UButton 
            v-if="cookie_usr_info.role === 1"
            @click="router.push('season/update')"
            label="Thêm Mùa Giải"
            icon="i-heroicons-plus-20-solid" 
          />
        </div>
      </div>
    </template>

    <template #filters>
      <div>
        <UFormGroup
          label="Tình Trạng"
        >
          <USelectMenu 
            v-model="selectedStatus" 
            :options="todoStatus" 
            option-attribute="label"
            value-attribute="value"
            multiple 
          />
        </UFormGroup>
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

async function fetch_seasons(api='http://localhost:8000/api/season/get') {
  seasons.value = await useFetch(api);
}
fetch_seasons();

watch(() => seasons.value, async (val) => {
  seasons_filtered.value = await utilsProcessSeason(val.data);
})
  

const columns = [
  { key: 'name', label: 'Tên Mùa Giải', sortable: true}, 
  { key: 'badge', label: 'Tình Trạng'},
  { key: 'start_date', label: 'Ngày Bắt Đầu', sortable: true}, 
  { key: 'end_date', label: 'Ngày Kết Thúc', sortable: true}, 
  { key: 'quantity_team', label: 'SL Đội' }, 
]

// Filter
const todoStatus = [{
  label: 'Chưa Bắt Đầu',
  value: '0',
}, {
  label: 'Đang Diễn Ra',
  value: '1',
}, {
  label: 'Đã Kết Thúc',
  value: '2',
}]

const selectedStatus = ref([]);
watch(() => selectedStatus.value, (val) => {
  if (val.length === 0) {
    fetch_seasons();
  } else {
    const fetch_url = 'http://localhost:8000/api/season/get?status=' + val.join(',');
    fetch_seasons('http://localhost:8000/api/season/get?status=' + val.join(','));
  }
})


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