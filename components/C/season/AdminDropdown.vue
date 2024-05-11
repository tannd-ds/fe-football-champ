<template>
  <UDropdown 
    :items="items" 
    :popper="{ placement: 'bottom-end' }"
    mode="hover"
  >
    <UButton color="white" label="Quản Lý" trailing-icon="i-heroicons-chevron-down-20-solid" />
  </UDropdown>
</template>

<script setup>

const router = useRouter();
const route =  useRoute();

const season_id = route.params.id;

const items = [
  [{
    label: 'Thêm Trận Đấu',
    icon: 'i-material-symbols-calendar-add-on',
    click: () => {
      router.push(`/match/update?season_id=${season_id}`)
    }
  }, {
    label: 'Xếp Bảng Đấu',
    icon: 'i-material-symbols-table-chart-sharp',
    click: () => {
      router.push(`/season/arrange/${season_id}`);
    }
  }], [{
    label: 'Sửa Thông Tin',
    icon: 'i-material-symbols-edit-square-outline-rounded',
    click: () => {
      router.push({
        path: `/season/update/`,
        query: { season_id: season_id }
      });
    }
  }, {
    label: 'Sửa Quy Định',
    icon: 'i-material-symbols-file-open-outline-rounded',
    click: () => {
      router.push({
        path: `/season/update/`,
        query: { season_id: season_id }
      });
    }
  }], [{
    label: 'Xóa',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {
      console.log('delete')
    }
  }]
]
</script>