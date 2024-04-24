<template>
  <div
    class="w-full p-4 bg-zinc-800 hover:bg-zinc-700 rounded-lg cursor-pointer transition-all duration-200 ease-in-out"
  >
    <div class="w-full flex justify-between items-center">
      <div class="ml-4 flex flex-col items-center">
        <span class="font-bold text-xl">{{ match.time }}</span>
        <span class="text-zinc-400">{{ match.date_only }}</span>
      </div>

      <div class="flex items-center justify-between space-x-8">
        <div class="flex flex-col gap-1 justify-center items-center">
          <LazyUAvatar 
            :src="`http://localhost:8000/api/get_img/team__${match.team_1_url_image}`"
            alt="team_1_logo" 
            class="w-10 h-10"
          />
          <div class="font-bold text-sm">{{ match.team_1_name }}</div>
        </div>

        <div class="font-bold">VS</div>

        <div class="flex flex-col gap-1 justify-center items-center">
          <LazyUAvatar 
            :src="`http://localhost:8000/api/get_img/team__${match.team_2_url_image}`"
            alt="team_1_logo" 
            class="w-10 h-10"
          />
          <div class="font-bold text-sm">{{ match.team_2_name }}</div>
        </div>
      </div>

      <div>
        <span 
          v-if="isMatchNotPassed(match.date)"
          class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
        >Sắp Diễn Ra</span>
        <span v-else>{{ match.team1_score }}-{{ match.team2_score }}</span>
      </div>

      <div 
        class="text-sm text-zinc-200 flex gap-2 items-center"
        @click="router.push(`/match/${match.schedule_id}`)"
      >
        <span>Chi Tiết</span>
        <UIcon name="i-heroicons-chevron-right" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  match: Object,
})

const router = useRouter();

function isMatchNotPassed(time) {
  let match_time = new Date(time);
  let current_time = new Date();

  return match_time > current_time;
}

</script>