<template>
  <div
    class="w-full p-4 bg-zinc-900 rounded-lg 
        border border-zinc-800
        transition-all duration-200 ease-in-out"
  >
    <div class="w-full justify-between items-center grid grid-cols-11">
      <div class="ml-4 col-span-2 flex flex-col items-start">
        <span class="font-bold text-lg">{{ match.time }}</span>
        <span class="text-zinc-400 text-sm">{{ match.date_only }}</span>
      </div>

      <button 
        class="unset col-span-2 flex flex-col gap-1 justify-center items-center"
        :title="`Xem thông tin ${match.team_1_name}`"
        @click="router.push(`/team/${match.team_id_1}`)"
      >
        <LazyUAvatar 
          :src="`http://localhost:8000/api/get_img/team__${match.team_1_url_image}`"
          alt="team_1_logo" 
          class="w-10 h-10"
        />
        <div class="font-bold text-sm text-center">{{ match.team_1_name }}</div>
      </button>

      <div class="font-bold col-span-1 text-center">VS</div>

      <button class="unset col-span-2 flex flex-col gap-1 justify-center items-center"
        :title="`Xem thông tin ${match.team_2_name}`"
        @click="router.push(`/team/${match.team_id_2}`)"
      >
        <LazyUAvatar 
          :src="`http://localhost:8000/api/get_img/team__${match.team_2_url_image}`"
          alt="team_1_logo" 
          class="w-10 h-10"
        />
        <div class="font-bold text-sm text-center">{{ match.team_2_name }}</div>
      </button>

      <div class="col-span-3 flex justify-center">
        <span 
          v-if="isMatchNotPassed(match.date)"
          class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
        >Sắp Diễn Ra</span>
        <span v-else>{{ match.team_1_score }}-{{ match.team_2_score }}</span>
      </div>

      <button 
        class="unset col-span-1 text-sm text-zinc-200 flex gap-2 items-center justify-end"
        @click="router.push(`/match/${match.schedule_id}`)"
      >
        <span>Chi Tiết</span>
        <UIcon name="i-heroicons-chevron-right" />
      </button>
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