<template>
  <div 
    class="group list-fade-in"
    :style="{ animationDelay: `${index * 0.1}s`}"
  >
    <div 
      class="w-full h-full py-4 cursor-pointer peer"
      @click="to_match_detail"
    >
      <div class="flex flex-col">
        <div class="justify-between grid grid-cols-8 grid-rows-1 items-center gap-y-2">
          <div class="col-span-2 flex flex-col items-center">
            <div class="text-lg font-bold">{{ props.match_info.time_only }}</div>
            <div class="text-sm text-gray-500">{{ props.match_info.date_only }}</div>
          </div>
          <div class="col-span-1 flex flex-col gap-2 items-center"></div>
          <div class="col-span-2 flex flex-col gap-2 items-center">
            <LazyUAvatar 
              :src="`http://localhost:8000/api/get_img/team__${props.match_info.team_1_url_image}`"
              alt="team_1_logo" 
            />
          </div>
          <div class="col-span-1 flex flex-col gap-2 items-center">
            <div class="font-bold text-gray-500">VS</div>
          </div>
          <div class="col-span-2 flex flex-col gap-2 items-center">
            <LazyUAvatar 
              :src="`http://localhost:8000/api/get_img/team__${props.match_info.team_2_url_image}`"
              alt="team_1_logo" 
            />
          </div>
        </div>

      </div>
    </div>


  </div>
</template>

<script setup>

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
  match_info: Object,
})

const router = useRouter();

const to_match_detail = () => {
  router.push(`/match/${props.match_info.id}`);
}
</script>