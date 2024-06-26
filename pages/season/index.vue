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

          <div class="flex flex-col gap-2">
            <UButton 
              v-if="cookie_usr_info.role === 1"
              @click="router.push('season/update')"
              label="Thêm Mùa Giải"
              icon="i-heroicons-plus-20-solid" 
            />
            <CDownloadButton :data_filtered="seasons_filtered" />
          </div>
        </div>
      </div>
    </template>

    <template #filters>
      <div class="w-full flex gap-4">
        <UFormGroup
          label="Tên Mùa Giải"
        >
          <UInput 
            v-model="selected_season_name" 
            placeholder="Nhập tên mùa giải"
            autocomplete="off"
          />
        </UFormGroup>
       
        <UFormGroup
          label="Tình Trạng"
        >
          <div class="flex gap-2">
            <USelectMenu 
              class="w-[200px]"
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
                @click="reset_filters"
                :disabled="!any_filter_selected"
                :icon="any_filter_selected ? 'i-material-symbols-filter-alt-off' : 'i-material-symbols-filter-alt'"
                :color="any_filter_selected ? 'red' : 'gray'"
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
const toasts = useToast();
const { value: cookie_usr_info } = useCookie('usr_info');

const PAGE_TITLE = 'Danh Sách Mùa Giải';
useHead({
  title: PAGE_TITLE,
});

let seasons = ref([]);

async function fetch_seasons(api='http://localhost:8000/api/season/get') {
  let { data: response } = await useFetch(api);
  return response.value;
}

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
const selected_season_name = ref('');

const seasons_filtered = computed(() => {
  if (!seasons.value || seasons.value.length === 0) {
    return [];
  }

  let temp_seasons = [];
  for (let i = 0; i < seasons.value.length; i++) {
    let season = seasons.value[i];
    let name_check = null;
    let status_check = null;

    // remove extra space
    selected_season_name.value = selected_season_name.value.trim();
    selected_season_name.value = selected_season_name.value.replace(/\s+/g, ' ');

    if (selected_season_name.value == '') {
      name_check = true;
    } else {
      name_check = season.name_season
        .toLowerCase()
        .includes(selected_season_name.value.toLowerCase())
    }

    if (selectedStatus.value.length == 0) {
      status_check = true;
    } else {
      status_check = selectedStatus.value.includes(season.status);
    }

    if (name_check && status_check) {
      temp_seasons.push(season);
    }
  }

  return utilsProcessSeason(temp_seasons);
});

const reset_filters = () => {
  selected_season_name.value = '';
  selectedStatus.value = [];
}

const any_filter_selected = computed(() => {
  return selected_season_name.value != '' || selectedStatus.value.length > 0;
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
        const { data: res } = await useFetch('http://localhost:8000/api/season/delete/' + row.id);
        
        if (res.value.code == 200) {
          toasts.add({
            title: 'Thành công',
            description: 'Xóa mùa giải thành công',
            color: 'green',
          })
          seasons.value = await fetch_seasons();
        } else if (res.value.code == 500) {
          toasts.add({
            title: 'Thất bại',
            description: res.value.content,
            color: 'red',
          })
        }
        
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

onMounted(async () => {
  const data = ref(null);
  while(!data.value) {
    data.value = await fetch_seasons();
    await nextTick();
  }
  seasons.value = data.value;
})
</script>