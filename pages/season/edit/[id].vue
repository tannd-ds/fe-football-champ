<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      Chỉnh Sửa Mùa Giải
    </template>
    <template #main>
      <UFormGroup label="Name Season" name="name_season">
        <UInput v-model="state.name_season" />
      </UFormGroup>

      <div class="w-full flex gap-4 items-stretch">
        <UFormGroup class="flex-grow" label="Start Date" name="start_date">
          <UInput type="date" v-model="state.start_date" />
        </UFormGroup>

        <UFormGroup class="flex-grow" label="End Date" name="end_date">
          <UInput type="date" v-model="state.end_date" />
        </UFormGroup>
      </div>

      <UFormGroup label="Quantity Team" name="quantity_team">
        <UInput v-model="state.quantity_team" />
      </UFormGroup>

      <UButton type="submit" @click.prevent="handleSubmit"> Submit </UButton>
    </template>
  </AppForm>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

const res = await useFetch('http://localhost:8000/api/season/edit/' + route.params.id);

// const state = res.data.value[0];
const state = ref({
  name_season: res.data.value[0].name_season,
  start_date: res.data.value[0].start_date,
  end_date: res.data.value[0].end_date,
  quantity_team: res.data.value[0].quantity_team,
})

async function handleSubmit() {
  console.log(state.value);

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