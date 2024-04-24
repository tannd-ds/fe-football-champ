<template>
  <TableBaseViewer 
    :data="soccers" 
    :columns="columns" 
    :items="items"
    table-name="soccer"
    real-name-in-json="name_soccer"
    @on-name-click="onNameClick"
  >
    <template #header>
      <div class="flex justify-between">
        <div>Danh Sách Cầu Thủ</div>
        <UTooltip text="Thêm Cầu Thủ" :popper="{ placement: 'bottom-end' }">
          <UButton @click="router.push('soccer/update')">
            <UIcon name="i-heroicons-plus-20-solid" />
          </UButton>
        </UTooltip>
      </div>
    </template>
  </TableBaseViewer>
</template>

<script setup>

const router = useRouter();

const team_list = await useFetch('http://localhost:8000/api/team/get');
const team_mapper = team_list.data.value.reduce((acc, team) => {
  acc[team.id] = team.name_team;
  return acc;
}, {});

let soccers = ref({'data': []});

async function fetch_soccers() {
  soccers.value = await useFetch('http://localhost:8000/api/soccer');
  for (const soccer of soccers.value.data) {
    soccer.category_text = (soccer.category === 0) 
        ? 'Trong Nước' 
        : 'Nước Ngoài';  

    soccer.badge = {
      text: soccer.category_text,
      color: (soccer.category === 0) ? 'green' : 'purple'
    };

    if (soccer.team_id === null) {
      soccer.team_name = 'Chưa Có Đội Bóng';
    } else { 
      soccer.team_name = team_mapper[soccer.team_id];
    }
  }

}
fetch_soccers();

const columns = [
  { key: 'url_image', label: ''},
  { key: 'name', label: 'Tên', sortable: true}, 
  { key: 'birthday', label: 'Ngày Sinh', sortable: true}, 
  { key: 'badge', label: 'Loại Cầu Thủ', sortable: true}, 
  { key: 'team_name', label: 'Đội Bóng', sortable: true}, 
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
        fetch_soccers();
      }
    }
  }]
]

let onNameClick = (row) => {
  router.push('/soccer/' + row.id);
}
</script>