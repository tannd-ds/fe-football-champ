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
        <div v-if="filtered_matches.length == 0" class="text-center text-gray-500 flex flex-col gap-2 justify-center items-center">
          <UIcon name="i-material-symbols-calendar-clock-outline-rounded" class="w-12 h-12" />
          <span>
            Không có trận đấu nào
          </span>
        </div>

        <div v-else>
          <CMatchCard
            v-for="(match, match_index) in filtered_matches"
            :index="match_index"
            :match_info="match"
            :index="match_index"
          />
        </div>

      </div>
    </div>
  </AppCard>
</template>

<script setup>

const { value: cookie_usr_info } = useCookie('usr_info');
const all_matches = ref([]);

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

onMounted(async () => {
  const { data } = await useFetch('http://localhost:8000/api/match/get/upcoming/');
  all_matches.value = data.value;
});

</script>