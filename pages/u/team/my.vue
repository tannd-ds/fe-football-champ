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

        <div class="flex flex-col gap-2">
          <UTooltip
            text="Chỉnh Sửa Thông Tin" 
          >
            <UButton 
              icon="i-heroicons-pencil"
              @click="router.push(`/team/update?team_id=${route.params.id}`)">
            </UButton>
          </UTooltip>

          <UTooltip
            :text="can_regis_into_season ? `Đăng Ký Giải Đấu` : `Số lượng cầu thủ không đủ để đăng ký`" 
          >
            <UButton 
              icon="i-heroicons-document-plus"
              @click="router.push(`/register/into_season?team_id=${route.params.id}&team_name=${team_info.name_team}`)"
              :disabled="!can_regis_into_season"
            ></UButton>
          </UTooltip>
        </div>
      </div>
    </template>
  </TableBaseViewer>
</template>

<script setup>

definePageMeta({
  layout: 'user',
})

const route = useRoute();
const router = useRouter();

let response = ref({data: []});
let team_info = ref({});
let team_soccers = ref({data: []});

let cookie_usr_info = useCookie('usr_info');

if (!cookie_usr_info.value.team_id) {
  router.push('/');
}

console.log(cookie_usr_info.value.team_id);
response.value = await useFetch(`http://localhost:8000/api/team/get/${cookie_usr_info.value.team_id}`);

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

        response.value = await useFetch(`http://localhost:8000/api/team/get/${cookie_usr_info.value.team_id}`);
      }
    }
  }]
]

let onNameClick = (row) => {
  router.push('/soccer/detail/' + row.id);
}
</script>