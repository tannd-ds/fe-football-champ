<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      Chỉnh Sửa Mùa Giải
    </template>
    <template #main>
      <div class="flex flex-col gap-3">
        <UFormGroup size="xl" label="Name Season" name="name_season">
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

const res = await useFetch('http://localhost:8000/api/season/edit/' + route.params.id);

const state = ref({
  name_season: res.data.value[0].name_season,
  start_date: res.data.value[0].start_date,
  end_date: res.data.value[0].end_date,
  quantity_team: res.data.value[0].quantity_team,
})

async function handleSubmit() {
  const response = await $fetch(`http://localhost:8000/api/season/update/${route.params.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(state.value),
  });

  // TODO: handle using status code instead
  if (response === "Season update successfully")
    router.push('/season');

}
</script>