<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      {{ PAGE_TITLE }}
    </template>
    <template #main>
      <UForm 
        class="flex flex-col gap-3" 
        :state="state" 
        :validate="validate"
        :schema="schema"
        @submit="handleSubmit"
      >
        <CInput
          v-model="state.name_season"
          label="Tên Mùa Giải"
          name="name_season"
          required
        />

        <div class="w-full flex gap-4 items-stretch">
          <CInput
            class="grow"
            v-model="state.start_date"
            label="Ngày Bắt Đầu"
            name="start_date"
            input-type="date"
            required
          />

          <CInput
            class="grow"
            v-model="state.end_date"
            label="Ngày Kết Thúc"
            name="end_date"
            input-type="date"
            required
          />
        </div>

        <CInput
          v-model="state.quantity_team"
          label="Số Lượng Đội"
          name="quantity_team"
          input-type="number"
          required
        />

        <UAccordion :items="advanced_settings">
          <template #default="{ item, index, open }">
            <UButton color="gray" variant="ghost" class="rounded-md" :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
              <UIcon :name="item.icon" class="w-4 h-4" />
              <span class="text-md text-zinc-300">{{ item.label }}</span>

              <template #trailing>
                <UIcon
                  name="i-heroicons-chevron-right-20-solid"
                  class="w-5 h-5 ms-auto transform transition-transform duration-200"
                  :class="[open && 'rotate-90']"
                />
              </template>
            </UButton>
          </template>

          <template #advanced>
            <div class="flex flex-col gap-3" >

              <!-- Tuổi cầu thủ -->
              <div class="w-full flex gap-4 items-stretch">
                <CInput
                  class="grow"
                  v-model="advanced_state.min_age"
                  label="Tuổi Cầu Thủ Tối Thiểu"
                  name="min_age"
                  input-type="number"
                />
                <CInput
                  class="grow"
                  v-model="advanced_state.max_age"
                  label="Tuổi Cầu Thủ Tối Đa"
                  name="max_age"
                  input-type="number"
                />
              </div>
              
              <!-- Số lượng cầu thủ -->
              <div class="w-full flex gap-4 items-stretch">
                <CInput
                  class="grow"
                  v-model="advanced_state.min_quantity_soccer"
                  label="Số lượng Cầu Thủ Tối Thiểu"
                  name="min_quantity_soccer"
                  input-type="number"
                />
                <CInput
                  class="grow"
                  v-model="advanced_state.max_quantity_soccer"
                  label="Số lượng Cầu Thủ Tối Đa"
                  name="max_quantity_soccer"
                  input-type="number"
                />

                <CInput
                  class="grow"
                  v-model="advanced_state.max_quantity_foreign_soccer"
                  label="SL Cầu Thủ Nước Ngoài Tối Đa"
                  name="max_quantity_foreign_soccer"
                  input-type="number"
                />
              </div>

              <!-- Số lượng bàn thắng -->
              <CInput
                v-model="advanced_state.quantity_category_goal"
                label="Số Loại Bàn Thắng"
                name="quantity_category_goal"
                input-type="number"
              />

              <!-- Thời gian trận đấu -->
              <CInput
                v-model="advanced_state.max_time_match"
                label="Thời Gian Trận Đấu (phút)"
                name="max_time_match"
                input-type="number"
              />

              <!-- Điểm số -->
              <div>
                <div class="w-full flex gap-4 items-stretch">
                  <CInput
                    class="grow"
                    v-model="advanced_state.win_score"
                    label="Điểm Số Thắng"
                    name="win_score"
                    input-type="number"
                  />
                  <CInput
                    class="grow"
                    v-model="advanced_state.draw_score"
                    label="Điểm Số Hòa"
                    name="draw_score"
                    input-type="number"
                  />
                  <CInput
                    class="grow"
                    v-model="advanced_state.lose_score"
                    label="Điểm Số Thua"
                    name="lose_score"
                    input-type="number"
                  />
                </div>

                <span 
                  v-if="score_validate_text != ''"
                  class="text-red-400"
                >
                  {{ score_validate_text }}
                </span>
              </div>


              <!-- Sắp xếp -->
              <UFormGroup 
                :required="false" 
                size="xl" 
                label="Thứ Tự Ưu Tiên Khi Xếp Hạng" 
                name="category_sort"
              >
                <CSortable
                  :items="category_sort_info.items"
                  :lists="category_sort_info.lists"
                  :item-swap-on-drop="true"
                />
              </UFormGroup>

            </div>
          </template>
        </UAccordion>

        <div>
          <UButton size="xl" type="submit">Submit</UButton>
        </div>
      </UForm>
    </template>
  </AppForm>
</template>

<script setup>

import { z } from 'zod';

const route = useRoute();
const router = useRouter();
const toasts = useToast();

let PAGE_TITLE = 'Thêm Mùa Giải Mới';
let fetch_api = 'http://localhost:8000/api/season/add';

const state = ref({
  name_season: '',
  start_date: '',
  end_date: '',
  quantity_team: '',
});

const advanced_state = ref({
  min_age: '16',
  max_age: '40',
  min_quantity_soccer: '15',
  max_quantity_soccer: '22',
  max_quantity_foreign_soccer: '3',
  quantity_category_goal: '3',
  max_time_match: '90',
  win_score: '3',
  draw_score: '1',
  lose_score: '0',
  category_sort: [],
})

const advanced_settings = [
  {
    label: 'Quy Định',
    icon: 'i-material-symbols-auto-stories-rounded',
    slot: 'advanced',
  }
]

const category_sort_info = ref({
  items: [
    { id: 1, name: 'Theo Hiệu Số Bàn Thắng', list_id: 1 },
    { id: 2, name: 'Theo Số Bàn Thắng Trên Sân Khách', list_id: 2 },
    { id: 3, name: 'Theo Kết Quả Đối Kháng 2 Đội', list_id: 3 },
  ],
  lists: [
    { id: 1, name: '' },
    { id: 2, name: '' },
    { id: 3, name: '' },
  ],
})


if (route.query.season_id) {
  PAGE_TITLE = 'Chỉnh Sửa Mùa Giải';
  fetch_api = 'http://localhost:8000/api/season/update/' + route.query.season_id;

  let res = await useFetch('http://localhost:8000/api/season/get/' + route.query.season_id);
  res = res.data.value[0];

  for (const key in state.value) {
    state.value[key] = String(res[key]);
  }

  function time_to_minutes(time) {
    const [hours, minutes, seconds] = time.split(':');
    return String(parseInt(hours) * 60 + parseInt(minutes));
  }

  for (const key in advanced_state.value) {
    if (key == 'max_time_match') {
      advanced_state.value[key] = time_to_minutes(res[key]);
      continue;
    } 
    // handle category_sort
    else if (key == 'category_sort') {
      let new_category_sort = JSON.parse(res[key]);
      for (let i = 0; i < 3; i++) {
        category_sort_info.value.items[new_category_sort[i]-1].list_id = i + 1;
      }
      continue;
    }
    advanced_state.value[key] = String(res[key]);
  }
}

useHead({
  title: PAGE_TITLE,
  meta: [
    {
      name: 'description',
      content: PAGE_TITLE,
    },
  ],
});

async function handleSubmit() {
  try {

    function minutes_to_time(minutes) {
      minutes = parseInt(minutes);
      const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
      const mins = String(minutes % 60).padStart(2, '0');
      return `${hours}:${mins}:00`;
    }

    // handle category_sort, turn it into an array of ids, sorted by list_id
    advanced_state.value.category_sort = category_sort_info.value.items
      .sort((a, b) => a.list_id - b.list_id)
      .map(item => item.id);


    // parse advanced_state to state
    for (const key in advanced_state.value) {
      if (advanced_state.value[key] == '')
        continue;
      if (key == 'max_time_match') {
        state.value[key] = minutes_to_time(advanced_state.value[key]);
        continue;
      }
      state.value[key] = advanced_state.value[key];
    }

    const response = await useFetch(fetch_api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state.value),
    });

    const res_status = response.data.value.code;
    const res_content = response.data.value.content;

    if (res_status === 200) {
      toasts.add({
        title: 'Thành Công',
        description: res_content,
      });

      router.push('/season');
    } else {
      toasts.add({
        title: 'Lỗi',
        description: response.data,
        type: 'error',
      });
    }

  } catch (error) {
    console.error(error);
  }

}

const schema = z.object({
  name_season: 
    z.string()
      .min(1, { message: 'Tên mùa giải không được để trống' }),
  start_date: 
    z.string()
      .min(1, { message: 'Ngày bắt đầu không được để trống' }),
  end_date: 
    z.string()
      .min(1, { message: 'Ngày kết thúc không được để trống' }),
  quantity_team: 
    z.string()
      .min(1, { message: 'Số lượng đội không được để trống' }),
}).refine(data => {
  return new Date(data.start_date) < new Date(data.end_date);
}, {
  message: 'Ngày kết thúc phải sau ngày bắt đầu',
  path: ['end_date'],
});

const score_validate_text = ref('');

const validate = (state)=> {
  const errors = [];

  let win_score = parseInt(advanced_state.value.win_score);
  let draw_score = parseInt(advanced_state.value.draw_score);
  let lose_score = parseInt(advanced_state.value.lose_score);

  if (win_score <= draw_score || draw_score <= lose_score) {
    score_validate_text.value = 'Điểm Thắng > Điểm Hòa > Điểm Thua!';

    errors.push({
      message: ' ',
      path: 'win_score'
    })

    errors.push({
      message: ' ',
      path: 'draw_score'
    })

    errors.push({
      message: ' ',
      path: 'lose_score'
    })
  } else {
    score_validate_text.value = '';
  }

  return errors;
}

</script>