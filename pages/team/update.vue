<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      {{ PAGE_TITLE }}
    </template>
    <template #main>
      <div class="flex flex-col gap-3">
        <CInput 
          v-model="state.name_team" 
          label="Tên Đội" 
          name="name_team" 
        />

        <div class="w-full flex gap-4 items-stretch">
          <CInput
            class="grow"
            v-model="state.quantity_soccer"
            label="SL Cầu Thủ"
            name="quantity_soccer"
          />

          <CInput 
            class="grow"
            input-type="date"
            v-model="state.established_date" 
            label="Ngày Thành Lập" 
            name="established_date" 
          />
        </div>

        <CInput 
          v-model="state.home_court" 
          label="Sân Nhà" 
          name="home_court"
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

let PAGE_TITLE = 'Thêm Đội Bóng Mới';
let fetch_api = 'http://localhost:8000/api/team/add';

const state = ref({
  name_team: '',
  quantity_soccer: '',
  established_date: '',
  home_court: '',
});

if (route.query.team_id) {
  PAGE_TITLE = 'Chỉnh Sửa Đội Bóng';
  fetch_api = 'http://localhost:8000/api/team/update/' + route.query.team_id;

  const res = await useFetch('http://localhost:8000/api/team/edit/' + route.query.team_id);

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
    }
  ]
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
  if (response === "Team update successfully" || response === "Team add successfully")
    router.push('/team');

}
</script>