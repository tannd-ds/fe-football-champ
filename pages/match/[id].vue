<template>
  <TableBaseViewer 
    :data="match_details" 
    :columns="columns" 
    :items="items"
  >
    <template #header>
      <div class="flex justify-between">
        <div>{{ PAGE_TITLE }}</div>
        <UTooltip text="Thêm Chi Tiết" :popper="{ placement: 'bottom-end' }">
          <UButton @click="router.push(`/match/detail/update?schedule_id=${route.params.id}`)">
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

const route = useRoute();
const router = useRouter();

let match_details = ref({'data': []});
match_details.value = await useFetch(`http://localhost:8000/api/match/get/detail/${route.params.id}`);

const columns = [
  { key: 'time_goal', label: 'Thời Điểm', sortable: true},
  { key: 'id', label: 'ID', sortable: true},
  { key: 'soccer_id', label: 'Cầu thủ', sortable: true},
  { key: 'team_id', label: 'Đội', sortable: true},
  { key: 'category_goal', label: 'Loại Bàn Thắng', sortable: true},
]


const items = (row) => [
  [{
    label: 'Chỉnh Sửa',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
        router.push('/team/update/?team_id=' + row.id);
    }
  }, {
    label: 'Xóa',
    icon: 'i-heroicons-trash-20-solid',
    click: async () => {
      if (confirm('Bạn có chắc chắn muốn xóa đội bóng này không?')) {
        const res = await useFetch('http://localhost:8000/api/team/delete/' + row.id);
        // TODO: Handle if delete fail
        match_details.value = await useFetch('http://localhost:8000/api/team/get');
      }
    }
  }]
]
</script>