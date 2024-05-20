<template>
  <ClientOnly>
    <div 
      v-if="all_matches.length > 0"
      class="pr-3 w-full max-h-full overflow-auto flex flex-col gap-4"
    >
      <div 
        v-for="(round, round_name) in matches_by_round"
        class="pr-3 w-full max-h-full overflow-auto flex flex-col gap-4"
      >
        <div class="p-1 bg-gray-200 rounded text-zinc-800 text-center font-bold">{{ round_name != 'Vòng null' ? round_name : 'Không có Vòng' }}</div>
          <CMatchItem
            v-for="(match, match_index) in round"
            :match="match"
            :index="match_index"
            @delete="update_matches"
            @update-match-date="update_matches"
          />
      </div>
    </div>

    <div v-else
      class="mt-[30vh] h-full flex justify-center items-center text-gray-500"
    >
      Không có trận đấu nào
    </div>
  </ClientOnly>
</template>

<script setup>

const route = useRoute();

const all_matches = ref([]);
const matches_by_round = ref({});

const fetch_matches = async () => {
  const { data: new_all_matches } = await useFetch(`http://localhost:8000/api/match/get/by_season/${route.params.id}`);

  let new_round_names = [...new Set(new_all_matches.value.map((match) => match.round))];
  let new_matches_by_round = {};
  for (let i=0; i< new_round_names.length; i++) {
    new_matches_by_round['Vòng ' + String(new_round_names[i])] = new_all_matches.value.filter((match) => match.round == new_round_names[i]);
  }

  return {
    all_matches: new_all_matches.value,
    matches_by_round: new_matches_by_round,
  }
}

const update_matches = async () => {
  let fetch_data = await fetch_matches();

  all_matches.value = fetch_data.all_matches;
  matches_by_round.value = fetch_data.matches_by_round;
}

update_matches();

</script>