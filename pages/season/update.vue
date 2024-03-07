<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      {{ PAGE_TITLE }}
    </template>
    <template #main>
      <div class="flex flex-col gap-3">
        <UFormGroup size="xl" label="Name Season" name="name_seas</UFormGroup>on">
            <UInput v-model="state.name_season" />
        </UFormGroup>

        <div class="w-full flex gap-4 items-stretch">
            <UFormGroup class="flex-grow" size="xl" label="Start Date" name="start_date">
            <UInput type="date" v-model="state.start_date" />
            </UFormGroup>

            <UFormGroup class="flex-grow" size="xl" label="End Date" name="end_date">
            <UInput type="date" v-model="state.end_date" />
            </UFormGroup>
        </div>

        <UFormGroup size="xl" label="Quantity Team" name="quantity_team">
            <UInput v-model="state.quantity_team" />
        </UFormGroup>

        <div>
          <UButton size="xl" type="submit" @click.prevent="handleSubmit"> Submit </UButton>
        </div>
      </div>
    </template>
  </AppForm>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

let PAGE_TITLE = 'Thêm Mùa Giải Mới';
let fetch_api = 'http://localhost:8000/api/season/add';

const state = ref({
  name_season: '',
  start_date: '',
  end_date: '',
  quantity_team: '',
});

if (route.query.season_id) {
  PAGE_TITLE = 'Chỉnh Sửa Mùa Giải';
  fetch_api = 'http://localhost:8000/api/season/update/' + route.query.season_id;

  const res = await useFetch('http://localhost:8000/api/season/edit/' + route.query.season_id);

  for (const key in state.value) {
    state.value[key] = res.data.value[0][key];
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
  const response = await $fetch(fetch_api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(state.value),
  });

  // TODO: handle using status code instead
  if (response === "Season update successfully" || response === "Season add successfully")
    router.push('/season');

}
</script>