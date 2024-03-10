<template>
  <div class="mr-3 grow h-[98vh]">
    <AppCard class="w-full h-full overflow-auto">
      <div class="flex flex-col gap-8">
        <h1 class="text-3xl font-bold">
          <slot name="header"></slot>
        </h1>
        <UTable 
          :rows="data.data" 
          :columns="columns" 
          @select="select" 
          :ui="{tbody: 'overflow-y-auto'}"
        >
          <template #actions-data="{ row }">
            <UDropdown :items="items(row)">
              <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
          </template>
        </UTable>
      </div>
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

const emit = defineEmits(['select']);

function select (row) {
  // don't do anything if the "action" columns is clicked
  emit('select', row);
  console.log(row.id);
}

</script>