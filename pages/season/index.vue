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
          <div>{{ PAGE_TITLE }}</div>
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
      <div class="w-full flex">
        <UFormGroup
          label="Tình Trạng"
          class="w-[200px]"
        >
          <div class="flex gap-2">
            <USelectMenu 
              class="grow"
              v-model="selectedStatus" 
              :options="status_options" 
              option-attribute="label"
              value-attribute="value"
              multiple 
            >
              <template #option="{ option: status }">
                <CBadge :data="{ color: status.color, text: status.label }" />
              </template>
            </USelectMenu>

            <UTooltip text="Xóa bộ lọc">
              <UButton
                @click="selectedStatus = []"
                :disabled="!selectedStatus.length"
                :icon="selectedStatus.length ? 'i-material-symbols-filter-alt-off' : 'i-material-symbols-filter-alt'"
                :color="selectedStatus.length ? 'red' : 'gray'"
                variant="ghost"
                size="sm"
              />
            </UTooltip>
          </div>
        </UFormGroup>

      </div>
    </template>
  </TableBaseViewer>
</template>

<script setup>

const route = useRoute();
const router = useRouter();
const { value: cookie_usr_info } = useCookie('usr_info');

const PAGE_TITLE = 'Danh Sách Mùa Giải';
useHead({
  title: PAGE_TITLE,
});

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
  { key: 'quantity_team', label: 'SL Đội', sortable: true }, 
]

// Filter
const status_options = [{
  label: 'Chưa Bắt Đầu',
  value: '0',
  color: 'gray',
}, {
  label: 'Đang Diễn Ra',
  value: '1',
  color: 'green',
}, {
  label: 'Đã Kết Thúc',
  value: '2',
  color: 'red',
}]

const selectedStatus = ref([]);
watch(() => selectedStatus.value, (val) => {
  fetch_seasons('http://localhost:8000/api/season/get?status=' + val.join(','));
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