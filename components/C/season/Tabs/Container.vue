<template>
  <UTabs :items="items" class="w-full h-full">
    <template #item="{ item }">
      <CSeasonTabsMatches 
        v-if="item.key === 'match'" 
        class="h-full"
      />

      <CSeasonTabsTeams 
        v-else-if="item.key === 'team'"
        class="h-full"
      />
    </template>
  </UTabs>
</template>

<script setup>
const items = [{
  key: 'match',
  label: 'Trận Đấu',
}, {
  key: 'team',
  label: 'Đội/CLB',
}]
</script>