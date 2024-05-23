<template>
  <div v-if="props.loading" class="p-12 flex items-center justify-center" >
    <CLoadingIcon />
  </div>

  <div 
    v-else
    class="px-2 grow flex flex-col gap-2 font-bold overflow-x-auto overflow-y-visible select-none">
    <!-- Label -->
    <div 
      v-if="props.soccers.length > 0"
      class="shrink-0 h-5 flex justify-between gap-2 font-bold text-xs -skew-x-3"
    >
        <div class="grow"></div>
        <div class="shrink-0 w-14 h-full flex items-center justify-center text-center bg-yellow-200 text-black">
          Thẻ Vàng
        </div>
        <div class="shrink-0 w-14 h-full flex items-center justify-center text-center bg-red-200 text-black">
          Thẻ Đỏ
        </div>
        <div class="shrink-0 w-16 h-full flex items-center justify-center text-center bg-primary text-black">
          Bàn Thắng
        </div>
    </div>

    <!-- Data -->
    <div
      v-for="(soccer, soccer_id) in props.soccers"
      class="relative h-14 shrink-0 overflow-visible list-fade-in"
      :style="{ animationDelay: `${soccer_id * 0.064}s` }"
    >
      <div class="group absolute h-14 w-full flex items-center gap-2
        -skew-x-3 hover:scale-[102%] hover:-translate-x-1 transition-all duration-200 ease-in-out
        transform-gpu">
        <div class="shrink-0 w-14 h-full flex items-center justify-center bg-zinc-200 text-xl text-zinc-800 font-black">
          {{soccer_id + 1}}
        </div>
        <div class="grow h-full w-full p-2 flex items-center gap-2 bg-zinc-800 text-zinc-200 font-normal
          transition-all duration-200 ease-in-out">
          <LazyUAvatar 
            :src="`http://localhost:8000/api/get_img/soccer__${soccer.url_image}`"
            :alt="soccer.name_soccer" 
          />
          <div class="flex flex-col">
            <span class="text-sm">
              {{ soccer.name_soccer }}
            </span>
            <span class="text-xs text-gray-400">
              {{ soccer.name_team }} • {{ soccer.category_text }}
            </span>
          </div>
        </div>
        <div 
          :class="[
            'shrink-0 w-14 h-full flex items-center justify-center text-sm font-black',
            soccer.n_yellow_card > 0 ? 'bg-yellow-200 text-zinc-800' : 'bg-zinc-200 text-zinc-600'
          ]"
        >
          {{ soccer.n_yellow_card }}
        </div>
        <div 
          :class="[
            'shrink-0 w-14 h-full flex items-center justify-center text-sm font-black',
            soccer.n_red_card > 0 ? 'bg-red-200 text-zinc-800' : 'bg-zinc-200 text-zinc-600'
          ]"
        >
          {{ soccer.n_red_card }}
        </div>
        <div class="shrink-0 w-16 h-full flex items-center justify-center bg-primary text-black font-black">
          {{ soccer.n_goal }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  soccers: {
    type: Array,
    required: true,
  }
})
</script>