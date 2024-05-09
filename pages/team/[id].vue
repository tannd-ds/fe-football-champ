<template>
  <TableBaseViewer 
    :data="team_soccers" 
    :columns="columns" 
    :items="items"
    table-name="soccer"
  >
    <template #header>
      <div class="flex justify-between">
        <div class="flex flex-col gap-4">
          <div class="flex gap-2 items-center">
            <LazyUAvatar :src="`http://localhost:8000/api/get_img/team__${team_info.url_image}`" />
            <div>{{ team_info.name_team }}</div>
          </div>
          <div class="text-base font-normal">
            <div class="flex flex-col gap-1">
              <div>
                <span class="font-bold">Ngày Thành Lập:</span> {{ team_info.established_date }}
              </div>
              <div>
                <span class="font-bold">Sân Nhà:</span> {{ team_info.home_court }}
              </div>
              <div>
                <span class="font-bold">Số Lượng Cầu Thủ:</span> {{ team_soccers.data.length }}
              </div>
            </div>
          </div>
        </div>

        <div 
          class="flex flex-col gap-2"
          v-if="cookie_usr_info.role === 1 || cookie_usr_info.team_id === team_info.id"
        >
          <UButton 
            @click="router.push({
              path: `/team/update`,
              query: {
                team_id: route.params.id,
                public: true,
              }
            })"
            icon="i-heroicons-pencil"
            label="Sửa Thông Tin"
          />

          <UButton 
            v-if="cookie_usr_info.role === 1 || cookie_usr_info.team_id === team_info.id"
            @click="router.push({
              path: `/register/into_season`,
              query: {
                team_id: route.params.id,
                team_name: team_info.name_team,
                public: true,
              }
            })"
            icon="i-heroicons-document-plus"
            label="Đăng Ký Giải Đấu"
          />
        </div>
      </div>
    </template>
  </TableBaseViewer>
</template>

<script setup>

const route = useRoute();
const router = useRouter();
const { value: cookie_usr_info } = useCookie('usr_info');

const PAGE_TITLE = 'Thông Tin Đội Bóng';
useHead({
  title: PAGE_TITLE,
});

let response = ref({data: []});
let team_info = ref({});
let team_soccers = ref({data: []});
response.value = await useFetch(`http://localhost:8000/api/team/get/${route.params.id}`);

const reload_data = async () => {
  team_info.value    = response.value.data.team[0];
  team_soccers.value.data = await processSoccer(response.value.data.team_soccer);
}

// Initial load
reload_data();

const can_regis_into_season = computed(() => {
  return true;
})


// Load every time the data changes
watch(response, async (newValue) => {
  reload_data();
})

const columns = [
  { key: 'url_image', label: ''},
  { key: 'name_soccer', label: 'Tên', sortable: true}, 
  { key: 'birthday', label: 'Ngày Sinh', sortable: true}, 
  { key: 'badge', label: 'Loại Cầu Thủ', sortable: true}, 
  { key: 'total_goal', label: 'Tổng Bàn Thắng', sortable: true}, 
  { key: 'actions'}
]

const items = (row) => [
  [{
    label: 'Chỉnh Sửa',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      router.push('/soccer/update?soccer_id=' + row.id);
    }
  }, {
    label: 'Đuổi',
    icon: 'i-heroicons-trash-20-solid',
    click: async () => {
      if (confirm('Bạn có chắc chắn muốn đuổi cầu thủ này không?')) {
        const res = await useFetch('http://localhost:8000/api/soccer/delete/' + row.id);

        response.value = await useFetch(`http://localhost:8000/api/team/get/${route.params.id}`);
      }
    }
  }]
]

let onNameClick = (row) => {
  router.push('/soccer/detail/' + row.id);
}
</script>