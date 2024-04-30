<template>
  <TableBaseViewer 
    :data="user_regis" 
    :columns="columns" 
    :items="items"
  >
    <template #header>
      <div class="flex justify-between">
        <div>Danh Sách Đơn Đăng Ký</div>
      </div>
    </template>
  </TableBaseViewer>
</template>

<script setup>

const route = useRoute();
const router = useRouter();
const { value: cookie_usr_info } = useCookie('usr_info');

async function fetch_listteam() {
  let response = await useFetch(`http://localhost:8000/api/register/get_by_user/${cookie_usr_info.id}`);

  return response;
}

let user_regis = ref({'data': []});
user_regis.value = await fetch_listteam();

[
    {
        "id": 7,
        "season_id": 1,
        "team_id": 4,
        "date_signin": "2024-04-28",
        "status": 1,
        "table_id": null
    },
    {
        "id": 10,
        "season_id": 2,
        "team_id": 4,
        "date_signin": "2024-04-30",
        "status": 1,
        "table_id": null
    }
]

const columns = [
  { key: 'name_season', label: 'Mùa Giải'},
  { key: 'date_signin', label: 'Ngày Đăng Ký'},
  { key: 'badge', label: 'Trạng Thái'},
  { key: 'table_id', label: 'Bảng'},
]

</script>