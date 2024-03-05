<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      Thêm Mùa Giải Mới
    </template>
    <template #main>
      <div class="w-full flex gap-4 items-stretch">
        <UFormGroup class="flex-grow" label="ID" name="id">
            <UInput v-model="state.id" />
        </UFormGroup>

        <UFormGroup class="flex-grow" label="Name Season" name="name_season">
            <UInput v-model="state.name_season" />
        </UFormGroup>
      </div>

      <div class="w-full flex gap-4 items-stretch">
        <UFormGroup class="flex-grow" label="Start Date" name="start_date">
          <UInput v-model="state.start_date" />
        </UFormGroup>

        <UFormGroup class="flex-grow" label="End Date" name="end_date">
          <UInput v-model="state.end_date" />
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

const toast = useToast();

const state = ref({
  id: 99,
  name_season: '',
  start_date: '',
  end_date: '',
  quantity_team: 0,
})

async function handleSubmit() {
  console.log(state.value);

  const response = await $fetch('http://localhost:8000/api/season/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(state.value),
  });

  console.log(response.status);

  if (response.status === 201) {
    toast.add({
    title: 'Success',
    description: 'Season added successfully',
    });
  } else {
    toast.add({
    title: 'Error',
    description: 'Season added failed',
    });
  }



}
</script>