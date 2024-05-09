<template>
  <TableBaseViewer 
    :data="props.teams" 
    :columns="teams_columns" 
    table-name="team"
    :use-small-text="true"
  >
    <template #header>
      <div>Bảng Xếp Hạng</div>
    </template>
  </TableBaseViewer>
</template>

<script setup>
const props = defineProps({
  teams: {
    type: Object,
    required: true,
  },
})

const teams_columns = [
  { key: 'url_image', label: ''},
  { key: 'name_team', label: 'Đội'},
  { key: 'win', label: 'Thắng'},
  { key: 'draw', label: 'Hòa'},
  { key: 'lose', label: 'Thua'},
  { key: 'total', label: 'Điểm'}
]

</script>