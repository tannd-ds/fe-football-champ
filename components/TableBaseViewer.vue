<template>
  <div class="grow h-full max-h-[98vh]">
    <AppCard class="w-full h-full overflow-auto">
      <div class="h-full flex flex-col gap-8">
        <h1 class="text-3xl font-bold">
          <slot name="header"></slot>
        </h1>
        <div>
          <div class="mb-2">

            <slot name="filters"></slot>
          </div>
          <UTable 
            :rows="data.data" 
            :columns="columns" 
          >

            <template #url_image-data="{ row }">
              <LazyUAvatar v-if="row.url_image" :src="`http://localhost:8000/api/get_img/${props.tableName}__${row.url_image}`" />
              <LazyUAvatar v-else :alt="String(row[props.realNameInJson])"/>
            </template>

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

            <template #badge-data="{ row }">
              <span 
                :class="{
                  'bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300': row.badge.color === 'green',
                  'bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300': row.badge.color === 'red',
                  'text-yellow-500bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300': row.badge.color === 'purple'
                }"
              >
                {{ row.badge.text }}
              </span>
            </template>

            <template #actions-data="{ row }">
              <UDropdown :items="items(row)">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
              </UDropdown>
            </template>

          </UTable>
        </div>
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
  },

  tableName: {
    type: String,
    default: '',
  }
})

const emit = defineEmits(['on-name-click']);
</script>