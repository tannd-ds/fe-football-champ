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
          :ui="{tbody: 'overflow-y-auto'}"
        >

          <template #name-data="{ row }">
            <UTooltip text="Xem chi tiết" :popper="{ placement: 'top' }">
              <span 
                class="font-bold underline cursor-pointer"
                @click="emit('on-name-click', row)"
              >
                {{ row[props.realNameInJson] }}
              </span>
            </UTooltip>
          </template>

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
  },

  realNameInJson: {
    type: String,
    default: 'name'
  }
})

const emit = defineEmits(['on-name-click']);
</script>