<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      Thêm Mùa Giải Mới
    </template>
    <template #main>
      <div class="flex flex-col gap-3">
        <UFormGroup required size="xl" label="Name Season" name="name_season">
          <UInput v-model="state.name_season" />
        </UFormGroup>

        <div class="w-full flex gap-4 items-stretch">
          <UFormGroup class="flex-grow" size="xl" label="Start Date" name="start_date">
            <UInput required type="date" v-model="state.start_date" />
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
const router = useRouter();
const state = ref({
  name_season: '',
  start_date: '',
  end_date: '',
  quantity_team: 0,
})

async function handleSubmit() {
  console.log(state);

  const response = await $fetch('http://localhost:8000/api/season/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(state.value),
  });

  // TODO: handle using status code instead
  if (response === "Season added successfully")
    router.push('/season');

}
</script>