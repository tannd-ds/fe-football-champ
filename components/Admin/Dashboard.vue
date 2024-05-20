<template>
  <div class="p-4 w-full h-full grid grid-cols-5 grid-rows-5 gap-4">
    <LazyAdminNumber class="col-start-1 row-start-1 col-span-full"/>
    <LazyAdminSeasonPieChart class="col-start-1 row-start-2 col-span-3 row-span-2"/>
    <LazyAdminTeamLeaderboard class="col-start-1 row-start-4 col-span-3 row-span-2"/>
    <LazyAdminUpcomingMatch class="col-start-4 row-start-2 col-span-2 row-span-4"/>
  </div>
</template>

<script setup>

</script>