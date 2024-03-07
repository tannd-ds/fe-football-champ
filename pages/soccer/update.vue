<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      {{ PAGE_TITLE }}
    </template>
    <template #main>
      <div class="flex flex-col gap-3">
        <CInput
          v-model="state.name_soccer"
          label="Tên Cầu Thủ"
          name="name_soccer"
        />

        <div class="w-full flex gap-4 items-stretch">
          <CInput
            class="grow"
            input-type="date"
            v-model="state.birthday"
            label="Sinh Nhật"
            name="birthday"
          />

          <CSelect
            class="grow"
            v-model="state.category"
            :options="category_options"
            label="Loại Cầu Thủ"
            name="category"
          />
        </div>


        <CSelect
          v-model="state.team_id"
          :options="team_options"
          label="Đội Bóng"
          name="team_id"
        />

        <div>
          <UButton type="submit" @click.prevent="handleSubmit"> Submit </UButton>
        </div>
      </div>
    </template>
  </AppForm>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

let PAGE_TITLE = 'Thêm Cầu Thủ Mới';
let fetch_api = 'http://localhost:8000/api/soccer/add';

const state = ref({
  name_soccer: '',
  birthday: '',
  category: '',
  team_id: '',
});

if (route.query.soccer_id) {
  PAGE_TITLE = 'Chỉnh Sửa Cầu Thủ';
  fetch_api = 'http://localhost:8000/api/soccer/update/' + route.query.soccer_id;

  const res = await useFetch('http://localhost:8000/api/soccer/edit/' + route.query.soccer_id);

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

const category_options = [
  { name: 'Trong Nước', value: 0, },
  { name: 'Nước Ngoài', value: 1, },
]

const team_list = await useFetch('http://localhost:8000/api/team');
const team_options = team_list.data.value.map((team) => {
  return {
    name: team.name_team,
    value: team.id,
  }
})

async function handleSubmit() {
  const response = await $fetch(fetch_api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(state.value),
  });

  // TODO: handle using status code instead
  if (response === "Soccer update successfully" || response === "Soccer add successfully")
    router.push('/soccer');

}
</script>