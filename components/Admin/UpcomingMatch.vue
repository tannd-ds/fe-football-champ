<template>
  <AppCard class="overflow-auto">
    <div class="flex flex-col gap-4">
      <div class="text-3xl font-bold">Lịch Thi Đấu</div>

      <div v-if="cookie_usr_info.role == 0" >
        <span 
          class="inline-flex items-center px-2 py-1 me-2 text-xs font-medium rounded-full cursor-pointer select-none border"
          :class="[
            show_this_team_only ? 
            'bg-blue-900 text-blue-300 border-blue-900' : 
            'text-blue-500 border-blue-500'
          ]"
          
          @click="show_this_team_only = !show_this_team_only"
        >
          Trận của Tôi
        </span>
      </div>

      <div class="flex flex-col gap-2 max-h-[90%] overflow-auto divide-y divide-zinc-700">
        <CMatchCard
          v-for="(match, match_index) in filtered_matches"
          :match_info="match"
        />
      </div>
    </div>
  </AppCard>
</template>

<script setup>

const { value: cookie_usr_info } = useCookie('usr_info');
const { data: all_matches } = await useFetch('http://localhost:8000/api/match/get/upcoming/');

const show_this_team_only = ref(false);

const filtered_matches = computed(() => {
  if (show_this_team_only.value) {
    let matches = [];
    for (let match of all_matches.value) {
      if (match.team_id_1 == cookie_usr_info.team_id || match.team_id_2 == cookie_usr_info.team_id) {
        matches.push(match);
      }
    }

    return matches;
  }
  return all_matches.value;
});

</script>