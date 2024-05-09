<template>
  <span class="flex">
    <UIcon 
      name="i-heroicons-information-circle" 
      class="mb-1 items-baseline text-xl"
      @click="open = true"
    />

    <UModal v-model="open">
      <AppCard>
        <h5 class="mb-4 text-2xl font-medium text-gray-200 text-center">{{ detail.name_season }}</h5>
        <div class="font-bold"></div>
        <div class="pt-4 font-bold border-t border-gray-600">Thông Tin Chung</div>
        <ul role="list" class="space-y-5 my-7">
          <li 
            class="flex items-center"
            v-for="info in general_info"
          >
            <svg class="flex-shrink-0 w-4 h-4 text-primary-700 dark:text-primary-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3"><span class="text-primary font-bold">{{ info.key }}:</span> {{ info.value }}</span>
          </li>
        </ul>

        <div class="pt-4 font-bold border-t border-gray-600">Quy định</div>
        <ul role="list" class="space-y-5 my-7">
          <li 
            class="flex items-center"
            v-for="info in regulation_info"
          >
            <svg class="flex-shrink-0 w-4 h-4 text-primary-700 dark:text-primary-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3"><span class="text-primary font-bold">{{ info.key }}:</span> {{ info.value }}</span>
          </li>
        </ul>
      </AppCard>
    </UModal>
  </span>
</template>

<script setup>

const props = defineProps({
  detail: {
    type: Object,
    required: true
  }
})

const general_info = {
  'start_date': {
    'key': 'Ngày bắt đầu',
    'value': props.detail.start_date,
  },
  'end_date': {
    'key': 'Ngày kết thúc',
    'value': props.detail.end_date,
  },
}

const regulation_info = {
  'quantity_team': {
    'key': 'Số Đội',
    'value': props.detail.quantity_team,
  },
  'min_age': {
    'key': 'Độ tuổi',
    'value': `Từ ${props.detail.min_age} đến ${props.detail.max_age}`,
  },
  'min_quantity_soccer': {
    'key': 'Số cầu thủ',
    'value': `Từ ${props.detail.min_quantity_soccer} đến ${props.detail.max_quantity_soccer}`,
  },
  'max_time_match': {
    'key': 'Thời gian tối đa một trận',
    'value': props.detail.max_time_match,
  },
  'win_score': {
    'key': 'Điểm thắng',
    'value': props.detail.win_score,
  },
  'lose_score': {
    'key': 'Điểm thua',
    'value': props.detail.lose_score,
  },
  'draw_score': {
    'key': 'Điểm hòa',
    'value': props.detail.draw_score,
  },
  'category_sort': {
    'key': 'Sắp xếp danh hiệu',
    'value': props.detail.category_sort,
  },
}

const open = ref(false);

</script>