<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      <div class="text-center">
        {{ PAGE_TITLE }}
      </div>
    </template>
    <template #main>
      <UForm 
        class="flex flex-col gap-3" 
        :state="state" 
        :schema="schema"
        @submit="handleSubmit"
      >
        <div>Đội Bóng: {{ route.query.team_name }}</div>

        <CSelect
          v-model="state.season_id"
          :options="season_options"
          label="Mùa Giải"
          name="season_id"
          required
        />

        <!-- Thông tin mùa giải: -->
        <div 
          v-if="chosen_season"
          class="space-y-2"
        >
          <div class="mt-2 text-lg font-bold flex gap-2 items-center">
            <span>Thông tin & Quy định Mùa giải</span>
          </div>

          <ul class="space-y-1 text-gray-500 list-inside dark:text-gray-400">
            <li 
              v-for="policy in policies"
              class="flex items-center gap-1"
            >
              <UIcon 
                name="i-heroicons-check-circle-20-solid"
                :class="[policy.status ? 'text-green-500' : 'text-gray-500']"
              />
              <span>{{ policy.content }}</span>
            </li>
          </ul>
        </div>

        <UCheckbox
          color="green"
          v-if="cookie_usr_info.role == '0'"
          v-model="state.is_confirm"
          label="Chúng tôi đã đọc và đồng ý với điều khoản của mùa giải"
          name="is_confirm"
          required
        />

        <div>
          <UButton type="submit">Gửi Đơn</UButton>
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
const { value : cookie_usr_info } = useCookie('usr_info');

const PAGE_TITLE = 'ĐƠN ĐĂNG KÝ';

useHead({
  title: PAGE_TITLE,
});

const state = ref({
  team_id: route.query.team_id,
  season_id: '',
  is_confirm: false,
  status: cookie_usr_info.role == '0' ? 0 : 1,
});

let { data: seasons } = await useFetch('http://localhost:8000/api/season/get_new');

const season_options = computed(() => {
  return seasons.value.map((season) => {
    return {
      name: season.name_season,
      value: season.id,
    }
  });
});

const chosen_season = ref('');
let policies = [];
// update chosen_season when state.season_id change
watch(state.value, (value) => {
  const season = seasons.value.find((season) => String(season.id) === String(value.season_id));
  chosen_season.value = season;

  policies = [
    {
      content: `Ngày bắt đầu: ${ chosen_season.value.start_date }`,
      status: 1,
    }, {
      content: `Ngày kết thúc: ${ chosen_season.value.end_date }`,
      status: 1,
    }, {
      content: `Số đội tham gia: ${ chosen_season.value.quantity_team }`,
      status: 1,
    }, {
      content: `Số cầu thủ/đội: ${ chosen_season.value.min_quantity_soccer } - ${ chosen_season.value.max_quantity_soccer }`,
      status: 0,
    }, {
      content: `Tuổi cầu thủ tối thiểu: ${ chosen_season.value.min_age }`,
      status: 0,
    },
  ]
})


const handleSubmit = async () => {

  state.value['date_signin'] = new Date().toISOString().slice(0, 10);

  const res = await useFetch('http://localhost:8000/api/register/into_season', {
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

const schema = z.object({
  season_id: 
    z.string().min(1, { message: 'Mùa giải không được để trống' }),
});


</script>