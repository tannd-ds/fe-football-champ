<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      Chỉnh Sửa Cầu Thủ
    </template>
    <template #main>
      <div class="flex flex-col gap-3">
        <UFormGroup size="xl" label="Tên Cầu Thủ" name="name_soccer">
          <UInput v-model="state.name_soccer" />
        </UFormGroup>

        <div class="w-full flex gap-4 items-stretch">
          <UFormGroup class="flex-grow" size="xl" label="Sinh Nhật" name="birthday">
          <UInput type="date" v-model="state.birthday" />
          </UFormGroup>

          <UFormGroup class="flex-grow" size="xl" label="Loại Cầu Thủ" name="category">
          <USelect v-model="state.category" :options="category_options" option-attribute="name"/>
          </UFormGroup>
        </div>

        <UFormGroup size="xl" label="Đội Bóng" name="team_id">
          <!-- <UInput v-model="state.team_id" /> -->
          <USelect v-model="state.team_id" :options="team_options" option-attribute="name"/>
        </UFormGroup>

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


const res = await useFetch('http://localhost:8000/api/soccer/edit/' + route.params.id);

const state = ref({
  name_soccer: res.data.value[0].name_soccer,
  birthday: res.data.value[0].birthday,
  category: res.data.value[0].category,
  team_id: res.data.value[0].team_id,
})

async function handleSubmit() {
  const response = await $fetch(`http://localhost:8000/api/soccer/update/${route.params.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(state.value),
  });

  // TODO: handle using status code instead
  if (response === "Soccer update successfully")
    router.push('/soccer');

}
</script>