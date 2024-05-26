<template>
  <AppCard class="w-[75%] h-[96vh] print:h-full section-to-print">
    <div class="h-full flex flex-col justify-start gap-4">
      <div class="flex justify-between" ref="el">
        <div class="text-3xl font-bold select-none print:hidden">
          Báo cáo Mùa giải
        </div>
        <div class="hidden print:block">
          <div class="text-3xl font-bold select-none">
            {{ all_seasons.find(season => season.id == chosen_season_id)?.name_season }}
          </div>
          <div class="text-xl font-bold select-none">
            Báo cáo Mùa giải - {{ tab_items[current_tab_index].label }}
          </div>
        </div>
        <UButton 
          class="print:hidden"
          @click="print_report"
          label="Xuất Báo Cáo"
          icon="i-material-symbols-download-rounded" 
        />
      </div>

      <TabGroup 
        as="div" 
        class="w-full flex flex-col gap-4"
        :style="{ height: `calc(100% - ${height}px - 1rem)`}"
        @change="change_tab"
      >
        <div class="flex gap-2 items-end print:hidden">

          <div class="flex items-center gap-2">
            <CSelect
              :label="'Mùa giải'"
              :options="season_options"
              v-model="chosen_season_id"
              class="w-[300px]"
            />
          </div>

          <TabList class="h-[44px] p-1.5 grow flex space-x-1 rounded-md bg-gray-900 border border-gray-700">
            <Tab 
              v-for="item in tab_items" 
              :key="item.key"
              v-slot="{ selected }"
              as="div"
              class="grow"
            >
              <button
                :class="[
                  'w-full rounded-md px-4 py-1.5 text-sm leading-5 font-bold',
                  'outline-none focus:outline-none transition-all duration-200 ease-in-out',
                  selected
                    ? 'bg-zinc-700 text-zinc-200'
                    : 'text-zinc-700 hover:bg-zinc-200/[0.08] hover:text-zinc-200',
                ]"
              >
                {{ item.label }}
              </button>
            </Tab>
          </TabList>
        </div>

        <TabPanels class="grow flex overflow-auto print:overflow-visible">
          <TabPanel class="w-full h-full flex flex-col items-center">
            <CReportTabsLeaderboard 
              class="w-full lg:max-w-[75%] print:max-w-none page-break"
              :chosen_season_id="chosen_season_id"
            />
          </TabPanel>

          <TabPanel
            class="w-full h-full flex flex-col items-center"
          >
            <CReportTabsTopSoccers
              class="w-full lg:max-w-[75%] print:max-w-none"
              :chosen_season_id="chosen_season_id"
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </AppCard>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { ref } from 'vue'
import { useElementSize } from '@vueuse/core'


const el = ref(null);
const { width, height } = useElementSize(el)

const tab_items = [{
  key: 'leaderboard',
  label: 'Bảng xếp hạng',
}, {
  key: 'top_scorer',
  label: 'Cầu Thủ Ghi Bàn',
}]

const current_tab_index = ref(0);

const all_seasons = ref([]);
const chosen_season_id = ref("-1");

const season_options = computed(() => all_seasons.value.map(season => ({
  value: season.id,
  name: season.name_season,
})));

const choose_season = (season_id) => {
  chosen_season_id.value = season_id;
}

onMounted(async () => {
  all_seasons.value = await $fetch('http://localhost:8000/api/season/get_simple');

  if (all_seasons.value.length != 0)
    chosen_season_id.value = String(all_seasons.value[0].id);
})

const print_report = () => {
  print();
}

const change_tab = (tab) => {
  current_tab_index.value = tab;
}
</script>

<style scoped>
@media print {

  .section-to-print {
    visibility: visible;
    position: absolute;
    width: 100%;
    height: 100vh;
  } 
  
  .page-break {
    page-break-inside: auto;
  }
}
</style>