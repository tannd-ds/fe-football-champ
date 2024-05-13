<template>
  <div class="pr-3 w-full max-h-full overflow-auto flex flex-col gap-4">
    <div class="p-1 bg-gray-200 rounded text-zinc-800 text-center font-bold">Vòng 1</div>
    <CMatchItem
      v-for="(match, match_index) in all_matches_round_1"
      :match="match"
    />

    <div class="p-1 bg-gray-200 rounded text-zinc-800 text-center font-bold">Vòng 2</div>
    <CMatchItem
      v-for="(match, match_index) in all_matches_round_2"
      :match="match"
    />
  </div>
</template>

<script setup>

const route = useRoute();

const { data: all_matches } = await useFetch(`http://localhost:8000/api/match/get/by_season/${route.params.id}`);

// separate matches by round
const all_matches_round_1 = computed(() => {
  return all_matches.value.filter((match) => match.round == 1);
})

const all_matches_round_2 = computed(() => {
  return all_matches.value.filter((match) => match.round == 2);
})
</script>