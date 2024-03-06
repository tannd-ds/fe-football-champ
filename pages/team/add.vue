<template>
  <AppForm class="w-[768px] h-[4/5vh]">
    <template #header>
      Thêm Đội Bóng Mới
    </template>
    <template #main>
      <div class="flex flex-col gap-3">
        <UFormGroup required size="xl" label="Tên Đội" name="name_team">
          <UInput v-model="state.name_team" />
        </UFormGroup>

        <div class="w-full flex gap-4 items-stretch">
          <UFormGroup class="flex-grow" size="xl" label="SL Cầu Thủ" name="quantity_soccer">
            <UInput v-model="state.quantity_soccer" />
          </UFormGroup>

          <UFormGroup class="flex-grow" size="xl" label="Ngày Thành Lập" name="established_date">
            <UInput type="date" v-model="state.established_date" />
          </UFormGroup>
        </div>

        <UFormGroup size="xl" label="Sân Nhà" name="home_court">
          <UInput v-model="state.home_court" />
        </UFormGroup>

        <!-- <UFormGroup size="xl" label="Logo Đội" name="url_image">
          <UInput type="file" ref="fileInput" @change="onUploadImage" />
        </UFormGroup> -->
        <!-- <input type="file" @change="onUploadImage" /> -->

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
  name_team: '',
  url_image: File,
  quantity_soccer: 0,
  established_date: 0,
  home_court: '',
})

const fileInput = ref(null);

const onUploadImage = (event) => {
  const uploaded_file = event.target.files[0];
  console.log(uploaded_file);

  state.value.url_image = uploaded_file;
}

async function handleSubmit() {
  const response = await $fetch('http://localhost:8000/api/team/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: state.value,
  });

  // TODO: handle using status code instead
  if (response === "Team added successfully")
    router.push('/team');

}
</script>