<template>
  <AppCard class="h-full">
    <div class="w-full h-full flex flex-col">
      <div class="mb-4 text-2xl font-bold select-none">Bảng Xếp Hạng</div>

      <CTeamLeaderboard 
        :teams="teams"
        :loading="loading"
      />
    </div>
  </AppCard>
</template>

<script setup>
const props = defineProps({
  teams: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
  }
})

const teams_columns = [
  { key: 'url_image', label: ''},
  { key: 'name_team', label: 'Đội'},
  { key: 'win', label: 'Thắng'},
  { key: 'draw', label: 'Hòa'},
  { key: 'lose', label: 'Thua'},
  { key: 'goal_difference', label: '+/-'},
  { key: 'total', label: 'Điểm'}
]

</script>