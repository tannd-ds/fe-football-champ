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

        <UCheckbox
          v-model="state.is_confirm"
          label="Chúng tôi đã đọc và đồng ý với điều khoản của mùa giải"
          name="is_confirm"
          required
        />

        <div>
          <UButton type="submit">Submit</UButton>
        </div>
      </UForm>
    </template>
  </AppForm>
</template>

<script setup>

const route = useRoute();
const router = useRouter();
const toasts = useToast();

const PAGE_TITLE = 'Đăng Ký Tham Gia Mùa Giải';

useHead({
  title: PAGE_TITLE,
});

const state = ref({
  team_id: route.query.team_id,
  season_id: '',
  is_confirm: false,
});

let seasons = await useFetch('http://localhost:8000/api/season');


const season_options = seasons.data.value.map((season) => {
  return {
    name: season.name_season,
    value: season.id,
  }
})

console.log(season_options);

const handleSubmit = async () => {

  state.value['date_signin'] = new Date().toISOString().slice(0, 10);

  const res = await useFetch('http://localhost:8000/api/register/into_season', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(state.value),
  });

  if (res.status.value == "success") {
    toasts.add({
      title: 'Thành Công',
      description: res.data,
      type: 'success',
    });
  } else {
    toasts.add({
      title: 'Lỗi',
      description: res.data,
      type: 'error',
    });
  }
}

const validate = (state) => {
  const errors = [];

  if (state.season_id == '') {
    errors.push({
      path: 'season_id',
      message: 'Mùa giải không được để trống',
    })
  }

  return errors;
}


</script>