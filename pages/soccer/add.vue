<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      Thêm Cầu Thủ
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

        <UFormGroup label="Đội Bóng" size="xl" name="team_id">
          <!-- <UInput v-model="state.team_id" /> -->
          <USelect v-model="state.team_id" :options="team_options" option-attribute="name"/>
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

const category_options = [
  { name: 'Trong Nước', value: 0, },
  { name: 'Nước Ngoài', value: 1, },
]

const state = ref({
  name_soccer: '',
  birthday: null,
  category: 0,
  team_id: null,
})

const team_list = await useFetch('http://localhost:8000/api/team');

const team_options = team_list.data.value.map((team) => {
  return {
    name: team.name_team,
    value: team.id,
  }
})

async function handleSubmit() {
  const response = await $fetch(`http://localhost:8000/api/soccer/add`, {
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