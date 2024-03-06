<template>
  <div class="mr-3 grow h-[98vh]">
    <AppCard class="w-full h-full">
      <h1 class="text-3xl font-bold">
        <slot name="header"></slot>
      </h1>
      <UTable :rows="data.data.value" :columns="columns" @select="select" >
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
      </UTable>
    </AppCard>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },

  columns: {
    type: Array,
    default: () => []
  },

  items: {
    type: Function,
    default: () => {}
  }
})

function select (row) {
  // don't do anything if the "action" columns is clicked
  console.log(row.id)
}

</script>