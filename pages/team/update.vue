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
        <CInput 
          v-model="state.name_team" 
          label="Tên Đội" 
          name="name_team" 
          required
        />

        <div class="w-full flex gap-4 items-stretch">
          <CInput
            class="grow"
            v-model="state.quantity_soccer"
            label="SL Cầu Thủ"
            name="quantity_soccer"
            required
          />

          <CInput 
            class="grow"
            input-type="date"
            v-model="state.established_date" 
            label="Ngày Thành Lập" 
            name="established_date" 
            required
          />
        </div>

        <CInput 
          v-model="state.home_court" 
          label="Sân Nhà" 
          name="home_court"
          required
        />

        <div>
          <UButton size="xl" type="submit">Submit</UButton>
        </div>
      </UForm>

    </template>
  </AppForm>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const toasts = useToast();

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
  try {
    const response = await $fetch(fetch_api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state.value),
    });

    // TODO: handle using status code instead
    if (response === "Team update successfully" || response === "Team added successfully") {
      router.push('/team');

      toasts.add({
        title: 'Success',
        description: response,
      })
    }

  } catch (error) {
    toasts.add({
      title: 'Error',
      description: error,
    })
  }
}

const validate = (state) => {
  const errors = [];
  if (state.name_team === '') {
    errors.push({ 
      'path': 'name_team', 
      'message': 'Tên đội không được để trống' 
    });
  }

  if (state.quantity_soccer === '') {
    errors.push({ 
      'path': 'quantity_soccer', 
      'message': 'Số lượng cầu thủ không được để trống' 
    });
  } else {
    // quantity_soccer must be a number and is between 15 and 22
    if (isNaN(state.quantity_soccer) || state.quantity_soccer < 15 || state.quantity_soccer > 22) {
      errors.push({ 
        'path': 'quantity_soccer', 
        'message': 'Số lượng cầu thủ trong khoảng từ 15 đến 22' 
      });
    }
  }

  if (state.established_date === '') {
    errors.push({ 
      'path': 'established_date', 
      'message': 'Ngày thành lập không được để trống' 
    });
  }

  if (state.home_court === '') {
    errors.push({ 
      'path': 'home_court', 
      'message': 'Sân nhà không được để trống' 
    });
  }

  return errors;
}
</script>