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
            :rows="processed_data" 
            :columns="columns" 
            :ui="custom_ui"
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
              <CBadge :data="row.badge" />
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
  },

  useSmallText: {
    type: Boolean,
    default: false,
  },

  wrapLines: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['on-name-click']);

const custom_ui = {
  td: {
    base: props.wrapLines ? 'whitespace-pre-line' : null,
    size: props.useSmallText ? 'text-xs' : null,
  }
}

const processed_data = computed(() => {
  let current_data = props.data;
  while (current_data.data) {
    current_data = current_data.data;
  }
  return current_data;
})
</script>