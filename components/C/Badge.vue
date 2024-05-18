<template>
  <span 
    class="text-xs font-medium me-2 px-2.5 py-0.5 rounded"
    :class="{
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': data.color === 'green',
      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300': data.color === 'red',
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300': data.color === 'purple',
      'bg-gray-100 text-gray-800 dark:bg-gray-500 dark:text-gray-900': data.color === 'gray',
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300': data.color === 'yellow',
    }"
  >
    {{ data.text }}
  </span>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
</script>