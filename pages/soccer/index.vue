<template>
  <TableBaseViewer 
    :data="soccer_filtered" 
    :columns="columns" 
    :items="items"
    table-name="soccer"
    real-name-in-json="name_soccer"
    @on-name-click="onNameClick"
  >
    <template #header>
      <div class="flex justify-between">
        <div>{{ PAGE_TITLE }}</div>

        <div class="flex flex-col gap-2">
          <UButton 
            v-if="cookie_usr_info.role === 1"
            @click="router.push('soccer/update')"
            label="Thêm Cầu Thủ"
            icon="i-heroicons-plus-20-solid" 
          />
          <CDownloadButton :data_filtered="soccer_filtered" />
        </div>
      </div>
    </template>

    <template #filters>
      <div class="w-full flex gap-4">
        <UFormGroup
          label="Tên Cầu Thủ"
        >
          <UInput 
            v-model="selected_soccer_name" 
            placeholder="Nhập tên cầu thủ"
            autocomplete="off"
          />
        </UFormGroup>

        <UFormGroup
          label="Loại Cầu Thủ"
        >
          <div class="flex gap-2">
            <USelectMenu 
              class="w-[200px]"
              v-model="selected_category" 
              :options="status_options" 
              option-attribute="label"
              value-attribute="value"
              multiple
            >
              <template #option="{ option: status }">
                <CBadge :data="{ color: status.color, text: status.label }" />
              </template>
            </USelectMenu>
          </div>
        </UFormGroup>

        <UFormGroup
          label="Đội Bóng"
        >
          <div class="flex gap-2">
            <USelectMenu 
              class="w-[200px]"
              v-model="selected_team" 
              :options="team_options" 
              option-attribute="label"
              value-attribute="value"
              multiple
            >
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

const router = useRouter();
const { value: cookie_usr_info } = useCookie('usr_info');

const PAGE_TITLE = 'Danh sách cầu thủ';
useHead({
  title: PAGE_TITLE,
});

async function fetch_soccers(api='http://localhost:8000/api/soccer') {
  let { data: response } = await useFetch(api);
  response.value = await processSoccer(response.value);

  return response.value;
}

let soccers = ref({'data': []});
soccers.value = await fetch_soccers();

const columns = [
  { key: 'url_image', label: ''},
  { key: 'name', label: 'Tên', sortable: true}, 
  { key: 'birthday', label: 'Ngày Sinh', sortable: true}, 
  { key: 'badge', label: 'Loại Cầu Thủ', sortable: true}, 
  { key: 'team_name', label: 'Đội Bóng', sortable: true}, 
  { key: 'total_goal', label: 'Tổng Bàn Thắng', sortable: true}, 
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
        soccers.value = await fetch_soccers();
      }
    }
  }]
]

let onNameClick = (row) => {
  router.push('/soccer/' + row.id);
}

// Filters
const status_options = [{
  label: 'Trong Nước',
  value: '0',
  color: 'green',
}, {
  label: 'Nước Ngoài',
  value: '1',
  color: 'purple',
}]

const team_list = await useFetch('http://localhost:8000/api/team/get');
const team_options = team_list.data.value.map((team) => {
  return {
    label: team.name_team,
    value: team.id,
  }
})

const selected_category = ref([]);
const selected_team = ref([]);
const selected_soccer_name = ref('');

const soccer_filtered = computed(() => {
  let temp_soccers = [];
  for (let i = 0; i < soccers.value.length; i++) {
    let soccer = soccers.value[i];
    let name_check = false;
    let status_check = false;
    let team_check = false;

    // remove extra space
    selected_soccer_name.value = selected_soccer_name.value.trim();
    selected_soccer_name.value = selected_soccer_name.value.replace(/\s+/g, ' ');

    if (selected_soccer_name.value == '') {
      name_check = true;
    } else {
      name_check = soccer.name_soccer
        .toLowerCase()
        .includes(selected_soccer_name.value.toLowerCase())
    }

    if (selected_category.value.length == 0) {
      status_check = true;
    } else {
      status_check = selected_category.value.includes(String(soccer.category));
    }

    if (selected_team.value.length == 0) {
      team_check = true;
    } else {
      team_check = selected_team.value.includes(soccer.team_id);
    }

    if (name_check && status_check && team_check) {
      temp_soccers.push(soccer);
    }
  }

  return temp_soccers;
})

const reset_filters = () => {
  selected_category.value = [];
  selected_team.value = [];
  selected_soccer_name.value = '';
}

const any_filter_selected = computed(() => {
  return selected_category.value.length > 0 || selected_team.value.length > 0 || selected_soccer_name.value != '';
})

</script>