<template>
  <div v-if="props.loading" class="p-12 flex items-center justify-center" >
    <CLoadingIcon />
  </div>

  <div 
    v-else
    class="px-2 grow flex flex-col gap-2 font-bold overflow-x-auto overflow-y-visible select-none">
    <!-- Label -->
    <div 
      v-if="props.teams.length > 0"
      class="shrink-0 h-5 flex justify-between gap-2 font-bold text-xs -skew-x-3"
    >
        <div class="grow"></div>
        <div class="shrink-0 w-16 h-full flex items-center justify-center bg-zinc-200 text-black">
          T-H-B
        </div>
        <div class="shrink-0 w-10 h-full flex items-center justify-center bg-zinc-200 text-black">
          +/-
        </div>
        <div class="shrink-0 w-10 h-full flex items-center justify-center bg-primary text-black">
          Điểm
        </div>
    </div>

    <!-- Data -->
    <div
      v-for="(team, team_index) in props.teams"
      class="relative h-12 shrink-0 overflow-visible list-fade-in"
      :style="{ animationDelay: `${team_index * 0.064}s` }"
    >
      <div class="group absolute h-12 w-full flex items-center gap-2
        -skew-x-3 transition-all duration-200 ease-in-out
        transform-gpu">
        <div class="shrink-0 w-10 h-full flex items-center justify-center bg-zinc-200 text-xl text-zinc-800 font-black">
          {{team_index + 1}}
        </div>
        <div 
          class="grow h-full w-full p-2 flex items-center gap-2 bg-zinc-800 text-zinc-200 font-normal
            hover:cursor-pointer
            transition-all duration-200 ease-in-out"
          @click="router.push(`/team/${team.team_id}`)"  
        >
          <LazyUAvatar 
            :src="`http://localhost:8000/api/get_img/team__${team.url_image}`"
            alt="team_1_logo" 
          />
          <div class="text-sm">{{ team.name_team }}</div>
        </div>
        <div class="shrink-0 w-16 h-full flex items-center justify-center bg-zinc-200 text-sm text-black font-black">
          {{ team.win }}-{{ team.draw }}-{{ team.lose }}
        </div>
        <div class="shrink-0 w-10 h-full flex items-center justify-center bg-zinc-200 text-black font-black
          transition-all duration-200 ease-in-out">
          {{ team.goal_difference }}
        </div>
        <div class="shrink-0 w-10 h-full flex items-center justify-center bg-primary text-black font-black">
          {{ team.total }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();

const props = defineProps({
  teams: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  }
})
</script>