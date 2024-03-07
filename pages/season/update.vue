<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      {{ PAGE_TITLE }}
    </template>
    <template #main>
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

        <div>
          <UButton size="xl" type="submit" @click.prevent="handleSubmit">Submit</UButton>
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
  if (response === "Season update successfully" || response === "Season added successfully")
    router.push('/season');

}
</script>