<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      {{ PAGE_TITLE }}
    </template>
    <template #main>
      <UForm class="flex flex-col gap-3" :state="state" :schema="schema" @submit="handleSubmit">

        <UAccordion :items="advanced_settings1">
          <template #default="{ item, index, open }">
            <UButton color="gray" variant="outline" class="rounded-md" size="xl"
              :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
              <span class="text-md text-zinc-300">{{ item.label }}</span>

              <template #trailing>
                <UIcon name="i-heroicons-chevron-right-20-solid"
                  class="w-5 h-5 ms-auto transform transition-transform duration-200" :class="[open && 'rotate-90']" />
              </template>
            </UButton>
          </template>

          <template #advanced>
            <div class="flex flex-col gap-3">
              <CSelect v-model="state.user_id" :options="user_options" label="Chọn người nhận" name="user_id"
                required />
            </div>
          </template>
        </UAccordion>
        <UAccordion :items="advanced_settings2">
          <template #default="{ item, index, open }">
            <UButton color="gray" variant="outline" class="rounded-md" size="xl"
              :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
              <span class="text-md text-zinc-300">{{ item.label }}</span>

              <template #trailing>
                <UIcon name="i-heroicons-chevron-right-20-solid"
                  class="w-5 h-5 ms-auto transform transition-transform duration-200" :class="[open && 'rotate-90']" />
              </template>
            </UButton>
          </template>

          <template #advanced>
            <div class="flex flex-col gap-3">
              <CSelect v-model="state.season_id" :options="season_options" label="Chọn mùa giải cần thông báo"
                name="season_id" required />



            </div>
          </template>
        </UAccordion>

        <span>Nội dung thông báo</span>
        <UTextarea v-model="state.content" name="content" required />


        <div>
          <UButton name="submit" size="xl" type="submit">Submit</UButton>
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

let PAGE_TITLE = 'Thêm thông báo';
let fetch_api = 'http://localhost:8000/api/notification/add';

const item = [{
  label: 'Gửi cho người dùng',
  icon: 'i-heroicons-information-circle',
  defaultOpen: true,
}, {
  label: 'Gửi cho mùa giải',
  icon: 'i-heroicons-information-circle',
  defaultOpen: true,
}
]
let state = ref({
  user_id: '',
  content: '',
  season_id: '',
})

let users = await useFetch('http://localhost:8000/api/user/get_all');
console.log(users.data.value);

const user_options = users.data.value.map((user) => {
  return {
    name: user.user_name,
    value: user.id,
  }
}
)

let seasons = await useFetch('http://localhost:8000/api/season/get');
console.log(seasons.data.value);
const season_options = seasons.data.value.map((season) => {
  return {
    name: season.name_season,
    value: season.id,
  }
})
const handleSubmit = async () => {
  const res = await useFetch(fetch_api, {
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
    state.value = {
      user_id: '',
      content: '',
      season_id: '',
    };
    router.replace();
  }
}
const advanced_settings1 = [
  {
    label: 'Gửi thông báo cho người dùng',
    slot: 'advanced',
  }
]
const advanced_settings2 = [
  {
    label: 'Gửi thông báo mùa giải',
    icon: 'i-heroicons-information-circle',
    slot: 'advanced',
  }
]

const schema = z.object({
  content: z.string().min(1, {
    path: ['content'],
    message: 'Nội dung thông báo không được để trống'
  }),
  user_id: z.string(),
  season_id: z.string(),
}).refine(data => data.user_id !== '' || data.season_id !== '',
{  message: 'Chọn ít nhất 1 người nhận thông báo',
  path: [ 'user_id','seasoN_id'], // Ensure this path correctly represents your intention for the validation message.
}
);

console.log(schema);


</script>