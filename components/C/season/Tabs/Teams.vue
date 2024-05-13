<template>
  <div class="pr-3 w-full max-h-full overflow-auto grid grid-cols-4 gap-4">
    <CTeamCard
      v-for="team in all_teams"
      :info="team"
    />
  </div>
</template>

<script setup>

const route = useRoute();
// const { value : cookie_usr_info } = useCookie('usr_info');

const { data: all_teams } = await useFetch(`http://localhost:8000/api/match/listteam/${route.params.id}`);

// if (cookie_usr_info.role == 1)
//   all_teams.value.push({ id: -1, });

</script>