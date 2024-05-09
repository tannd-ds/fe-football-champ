<template>
  <AppCard class="w-full h-[90vh] overflow-auto spacey-8">
    <div class="w-full h-full space-y-8">
      <div class="flex flex-col gap-4 items-center">
        <div class="text-5xl font-bold">{{ PAGE_TITLE }}</div>
        <div class="text-xl">{{ season_info.name_season }} </div>
      </div>

      <CDraggable
        :lists="tables_info.list"
        :items="tables_info.items"
      />

      <div class="flex justify-center">
        <UButton
          label="Hoàn Tất"
          size="lg"
          icon="i-heroicons-check-20-solid"
          @click="save"
        />
      </div>
    </div>
  </AppCard>
</template>

<script setup>

const route = useRoute();
const router = useRouter();
const toasts = useToast();

const PAGE_TITLE = 'Xếp Bảng Đấu';
useHead({
  title: PAGE_TITLE,
});

const { data : season_info } = await useFetch(`http://localhost:8000/api/season/get/${route.params.id}`);
season_info.value = season_info.value[0];

const tables_info = ref({
  list: [
    { id: 0, name: 'Chưa xếp bảng'},
    { id: 1, name: 'Bảng A' },
    { id: 2, name: 'Bảng B' },
    { id: 3, name: 'Bảng C' },
  ],
  items: [],
})

const { data: listteam } = await useFetch(`http://localhost:8000/api/match/listteam/${route.params.id}`);

console.log(listteam.value);

for (let i = 0; i < listteam.value.length; i++) {
  tables_info.value.items.push({
    id: listteam.value[i].team_id,
    name: listteam.value[i].name_team,
    list_id: 0,
  })
}

const save = async () => {
  // check if all teams are arranged
  for (let index in tables_info.value.items) {
    if (tables_info.value.items[index].list_id === 0) {
      toasts.add({
        title: 'Lỗi',
        description: 'Vui lòng xếp đủ tất cả các đội',
        status: 'error',
        color: 'red',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  }

  let request_body = {
    season_id: route.params.id,
    teams: tables_info.value.items
  }

  const { data: res } = await useFetch(
      `http://localhost:8000/api/season/arrange`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request_body),
      }
  );

  if (res.value.code == 200) {
    toasts.add({
      title: 'Thành công',
      description: res.value.content,
      color: 'green',
    });
    // redirect to season page
    router.push(`/season/${route.params.id}`);

  } else {
    toasts.add({
      title: 'Lỗi',
      description: res.value.content,
      color: 'red',
    });
  }
}

</script>