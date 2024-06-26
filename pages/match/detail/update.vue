<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      {{ PAGE_TITLE }}
    </template>
    <template #main>
      <ClientOnly>
        <UForm 
          class="flex flex-col gap-3" 
          :state="state" 
          :schema="schema"
          :validate="validate"
          @submit="handleSubmit"
        >
          <div>Trận: {{ match_details.team_1_name }} vs. {{ match_details.team_2_name }}</div>

          <CSelect
            v-model="state.team_id"
            :options="listteam_options"
            label="Đội Bóng"
            name="team_id"
            required
          />

          <CSelect
            v-model="state.soccer_id"
            :options="soccers_options"
            label="Cầu Thủ"
            name="soccer_id"
            :disabled="!state.team_id"
            required
          />

          <div class="mt-8 flex items-center justify-center gap-16">
            <div
              v-for="method in methods"
              class="
                  w-36 h-36 flex flex-col gap-3 items-center justify-center border border-gray-600 rounded-lg 
                  cursor-pointer transition-all duration-300 ease-in-out"
              :class="{
                'bg-primary-500 text-zinc-800': chosen_method === method.value,
              }"
              @click="chosen_method = method.value"
            >
              <UIcon 
                class="text-5xl"
                :name="method.icon" 
              />
              <span> {{ method.label }} </span>
            </div>
          </div>

          <TransitionGroup name="list" tag="div">
            <CSelect
              v-if="chosen_method === 'foul'"
              class="w-full"
              v-model="state.category_goal"
              :options="category_foul_options"
              label="Loại Phạm Lỗi"
              name="category_goal"
            />

            <CSelect
              v-if="chosen_method === 'goal'"
              class="w-full"
              v-model="state.category_goal"
              :options="category_goal_options"
              label="Loại Bàn Thắng"
              name="category_goal"
            />
          </TransitionGroup>

          <div>
            <UFormGroup 
              size="xl" 
              label="Thời Điểm" 
              name="time_goal_range"
              required
            >
            </UFormGroup>

            <div class="flex gap-2 items-center">
              <URange 
                v-model="state.time_goal" 
                :min="0"
                :max="time_splits"
              />
              <UInput 
                class="w-[100px]"
                v-model="state.time_goal" 
                type="number" 
                size="xl"
              />
            </div>
          </div>


          <div>
            <UButton type="submit">Submit</UButton>
          </div>
        </UForm>
      </ClientOnly>
    </template>
  </AppForm>
</template>

<script setup>

import { z } from 'zod';

const route = useRoute();
const router = useRouter();
const toasts = useToast();

let PAGE_TITLE = 'Thêm Thông Tin Trận Đấu';
let fetch_api = 'http://localhost:8000/api/match/add';

useHead({
  title: PAGE_TITLE,
});


const state = ref({
  schedule_id: route.query.schedule_id,
  soccer_id: '',
  team_id: '',
  category_goal: '',
  time_goal: 0,
});


// Get match details
let match_details = ref({});
match_details.value = await useFetch(`http://localhost:8000/api/match/get/by_schedule/${route.query.schedule_id}`);
match_details.value = match_details.value.data;

const listteam_options = computed(() => {
  return [
    {
      name: match_details.value.team_1_name,
      value: match_details.value.team_id_1,
    },
    {
      name: match_details.value.team_2_name,
      value: match_details.value.team_id_2,
    }
  ]
})

// List soccer options
const soccers_options = ref([]);

watch(() => state.value.team_id, async (team_id) => {
  if (team_id) {
    let soccers = await useFetch(`http://localhost:8000/api/team/get/${team_id}`);
    soccers = soccers.data.value.team_soccer;
    soccers_options.value = soccers.map((soccer) => {
      return {
        name: soccer.name_soccer,
        value: soccer.id,
      }
    })
  } else {
    soccers_options.value = [];
  }
})

const methods = [
  { 
    value: 'goal', 
    icon: 'i-heroicons-bolt-solid',
    label: 'Bàn Thắng' 
  },
  { 
    value: 'foul', 
    icon: 'i-heroicons-hand-raised-solid',
    label: 'Phạm Lỗi' 
  },
]

const chosen_method = ref('goal');

const category_goal_options = computed(() => {
  let options = [];
  for (let i = 0; i < match_details.value.quantity_category_goal; i++) {
    options.push({
      name: `Loại ${String.fromCharCode(65 + i)}`,
      value: i,
    })
  }
  return options;
})

// This is not neccessarily a computed property, but for the sake of consistency
// with category_goal_options, I will make it a computed property
const category_foul_options = computed(() => {
  return [
    { name: 'Thẻ Vàng', value: 'yellow_card', },
    { name: 'Thẻ Đỏ', value: 'red_card', },
  ]
});

watch(() => state.value.time_goal, (val) => {
  if (parseInt(val) < 0) {
    state.value.time_goal = 0;
  } else if (parseInt(val) > time_splits) {
    state.value.time_goal = time_splits;
  }
})

const validate = (state) => {
  const errors = [];

  if (!state.team_id) {
    errors.push({
      message: 'Chưa chọn đội bóng',
      path: 'team_id'
    });
  }

  if (!state.soccer_id) {
    errors.push({
      message: 'Chưa chọn cầu thủ',
      path: 'soccer_id'
    });
  }

  // check if soccer is in the team
  if (state.soccer_id) {
    let soccer_ids = soccers_options.value.map((soccer) => String(soccer.value));
    if (!soccer_ids.includes(state.soccer_id)) {
      errors.push({
        message: 'Cầu thủ không thuộc đội bóng',
        path: 'soccer_id'
      });
    }
  }

  if (!state.category_goal) {
    errors.push({
      message: 'Chưa chọn loại bàn thắng',
      path: 'category_goal'
    });
  }

  if (chosen_method.value == 'goal') {
    const goal_options_value = category_goal_options.value.map((option) => String(option.value));
    if (!goal_options_value.includes(state.category_goal)) {
      errors.push({
        message: 'Loại bàn thắng không hợp lệ',
        path: 'category_goal'
      });
    }
    
  } else if (chosen_method.value == 'foul') {
    const foul_options_value = category_foul_options.value.map((option) => String(option.value));
    if (!foul_options_value.includes(state.category_goal)) {
      errors.push({
        message: 'Loại phạm lỗi không hợp lệ',
        path: 'category_goal'
      });
    }
  }
  return errors;
}

const handleSubmit = async () => {

  // Convert time_goal from minutes to hh:mm:ss
  let time_splits = parseInt(state.value.time_goal);
  let hours = String(Math.floor(time_splits / 60)).padStart(2, '0');
  let minutes = String(time_splits % 60).padStart(2, '0');
  let seconds = '00';
  state.value.time_goal = hours + ':' + minutes + ':' + seconds;

  const res = await useFetch('http://localhost:8000/api/match/detailschedule/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(state.value),
  });

  const res_status = res.data.value.code;
  const res_content = res.data.value.content;

  if (res_status === 200) {
    toasts.add({
      title: 'Thành Công',
      description: res_content,
    });
    router.back();
  } else {
    toasts.add({
      title: 'Thất Bại',
      description: res_content,
    });
  }
}

// Validation
// Convert max_time_match from hh:mm:ss to minutes
let time_splits = String(match_details.value.max_time_match).split(':');
time_splits = parseInt(time_splits[0]) * 60 + parseInt(time_splits[1]);

const schema = z.object({
  // Time goal has to be between 0 and max_time_match
  time_goal: z.any()
    .refine(val => {
      return parseInt(val) >= 0 && parseInt(val) <= time_splits;
    }, 'Thời điểm không hợp lệ')
})

// ====================
// TODO: Add validation for category_goal
// ====================

</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-active {
  position: absolute;
}
</style>  