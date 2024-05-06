<template>
  <!-- <div class="w-full flex gap-4 overflow-auto"> -->
  <AppCard>

    <div class="mb-8 text-3xl font-bold">Lịch Thi Đấu</div>
    <div class="flex flex-col gap-2 max-h-[90%] overflow-auto divide-y divide-zinc-700">
      <CMatchCard
        v-for="(match, match_index) in all_matches"
        :match_info="match"
      />
    </div>
  </AppCard>
  <!-- </div> -->
</template>

<script setup>

const { data: all_matches } = await useFetch('http://localhost:8000/api/match/get/upcoming/');

</script>