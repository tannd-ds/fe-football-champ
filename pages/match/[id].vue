<template>
  <AppCard class="w-full xl:w-1/2 h-[96vh]">
    <div class="h-full flex flex-col gap-4">
      <div class="flex flex-col gap-16">
        <div class="flex justify-between">
          <div>
            <span class="text-primary font-bold">{{ match_info.name_season }}</span> • {{ match_info.date }}
          </div>
          <UButton 
            v-if="cookie_usr_info.role === 1"
            @click="router.push(`/match/detail/update?schedule_id=${route.params.id}`)"
            label="Thêm Chi Tiết"
            icon="i-heroicons-plus-20-solid" 
          />
        </div>
        <div>
          <div class="flex justify-center">
            <div class="w-3/5 grid grid-cols-5 grid-rows-2 place-items-center">
              <div class="flex flex-col justify-center items-center gap-2">
                <LazyUAvatar 
                  :src="`http://localhost:8000/api/get_img/team__${match_info.team_1_url_image}`" 
                  size="lg"
                />
              </div>

              <div class="text-3xl font-bold">{{ match_info.team_1_score }}</div>
              <div class="text-3xl font-bold">-</div>
              <div class="text-3xl font-bold">{{ match_info.team_2_score }}</div>

              <div class="flex flex-col justify-center items-center gap-2">
                <LazyUAvatar 
                  :src="`http://localhost:8000/api/get_img/team__${match_info.team_2_url_image}`" 
                  size="lg"
                />
              </div>
              <span class="truncate">{{ match_info.team_2_name }}</span>
              <span class="col-start-5 truncate">{{ match_info.team_1_name }}</span>
            </div>
          </div>

          <div class="text-gray-300 text-center font-light">Vòng {{ match_info.round }}</div>
          <div class="text-gray-300 text-center font-light">Sân {{ match_info.court }}</div>
        </div>
      </div>
      <div class="h-full flex flex-col gap-4 overflow-auto select-none">
        <div
          v-for="match in match_details"
          class="mr-2 mb-2 shrink-0 border border-gray-600 rounded-lg overflow-hidden"
        >
          <div v-if="match.category_goal.endsWith('card')">
            <div 
              class="p-4 flex justify-between border-b border-gray-700"
              :class="{
                'bg-yellow-600' : match.category_goal == 'yellow_card',
                'bg-red-800' : match.category_goal == 'red_card',
              }"
            >
              <div class="flex gap-4 items-center">
                <LazyUIcon 
                  name="i-heroicons-clipboard-solid"
                />
                <span class="font-bold">{{ match.category_goal == 'yellow_card' ? 'THẺ VÀNG' : 'THẺ ĐỎ'}}</span>
              </div>

              <span>{{ match.time_goal }}</span>

            </div>
            <div class="p-4 flex justify-between">
              <div class="flex flex-col gap-1">
                <span class="font-bold">
                  {{ match.name_soccer }}
                </span>
                <span>
                {{ match.name_team }}
                </span>
              </div>
              <LazyUAvatar 
                :src="`http://localhost:8000/api/get_img/team__${match.team_url_image}`" 
                size="lg"
              />
            </div>
          </div>

          <div v-else>
            <div class="p-4 pt-8 flex flex-col border-b border-gray-700 bg-green-700">
              <div class="flex flex-col gap-2 items-center">
                <CFootballIcon class="text-4xl animate-bounce"/>
                <span class="font-bold">VÀOOOOOO!!!</span>
              </div>

              <span class="text-gray-200 text-center">{{ match.time_goal }}</span>

            </div>
            <div class="p-4 flex justify-between">
              <div class="flex flex-col gap-1">
                <span class="font-bold">
                  {{ match.name_soccer }}
                </span>
                <span>
                {{ match.name_team }}
                </span>
              </div>
              <LazyUAvatar 
                :src="`http://localhost:8000/api/get_img/team__${match.team_url_image}`" 
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppCard>

</template>

<script setup>

const PAGE_TITLE = 'Chi Tiết Trận Đấu';

useHead({
  title: PAGE_TITLE,
})

const route = useRoute();
const router = useRouter();
const { value: cookie_usr_info } = useCookie('usr_info');

let match_details = await $fetch(`http://localhost:8000/api/match/get/detail/${route.params.id}`);

const match_info = await $fetch(`http://localhost:8000/api/match/get/by_schedule/${route.params.id}`);
</script>