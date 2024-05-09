<template>
  <TableBaseViewer 
    :data="team_info_calculated" 
    :columns="columns" 
    :items="items"
    table-name="team"
    real-name-in-json="name_team"
    @on-name-click="onNameClick"
  >
    <template #header>
      <div class="flex justify-between">
        <div>{{ PAGE_TITLE }}</div>
        <UButton 
          v-if="cookie_usr_info.role === 1"
          @click="router.push('team/update')"
          label="Thêm Đội Bóng"
          icon="i-heroicons-plus-20-solid" 
        />
      </div>
    </template>

    <template #filters>
      <div class="w-full flex gap-4">
        <UFormGroup
          label="Tên Đội Bóng"
        >
          <div class="flex gap-2">
            <UInput 
              v-model="search_team_name" 
              placeholder="Nhập tên đội bóng"
            />
       
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
const { value: cookie_usr_info } = useCookie('usr_info');

const PAGE_TITLE = 'Danh Sách Đội Bóng';
useHead({
  title: PAGE_TITLE,
});

async function fetch_teams(api='http://localhost:8000/api/team/get') {
  let response = await useFetch(api);
  return response;
}

let team_info = ref({'data': []});
team_info.value = await fetch_teams();

const columns = [
  { key: 'url_image', label: ''},
  { key: 'name', label: 'Tên Đội', sortable: true, click: (row) => console.log(row)}, 
  { key: 'quantity_soccer', label: 'SL Cầu Thủ', sortable: true}, 
  { key: 'established_date', label: 'Ngày Thành Lập' }, 
  { key: 'home_court', label: 'Sân Nhà' }, 
]

// Only admin can edit and delete season
if (cookie_usr_info.role === 1) {
  columns.push({ key: 'actions' });
}

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
        team_info.value = await fetch_teams();
      }
    }
  }]
]

let onNameClick = (row) => {
  router.push({ 
    path: `team/${row.id}`, 
    query: route.query 
  });
}

// Filters
const search_team_name = ref('');

const team_info_calculated = computed(() => {
  if (search_team_name.value == '') {
    return team_info.value;
  }

  // remove extra space
  search_team_name.value = search_team_name.value.trim();
  search_team_name.value = search_team_name.value.replace(/\s+/g, ' ');

  return {
    data: team_info.value.data.filter((team) => {
      return team.name_team.toLowerCase().includes(search_team_name.value.toLowerCase());
    })
  }
})

const reset_filters = () => {
  search_team_name.value = '';
}

const any_filter_selected = computed(() => {
  return search_team_name.value;
})

</script>