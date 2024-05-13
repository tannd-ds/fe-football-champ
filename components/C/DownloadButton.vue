<template>
  <UDropdown 
    v-if="cookie_usr_info.role === 1"
    class="w-full"
    :items="items" 
    :popper="{ placement: 'bottom-end' }"
    mode="hover"
  >
    <UButton 
      class="w-full cursor-context-menu"
      label="Xuất Dữ Liệu"
      icon="i-material-symbols-download-rounded" 
    />
  </UDropdown>
</template>

<script setup>

const props = defineProps({
  data_filtered: Array,
})

const router = useRouter();
const route =  useRoute();
const { value: cookie_usr_info } = useCookie('usr_info');

const items = [
  [{
    label: 'JSON',
    icon: 'i-material-symbols-code',
    click: () => {
      utilsDownloadData({name: 'data', format: 'json', data: props.data_filtered,})
    }
  }, {
    label: 'CSV',
    icon: 'i-material-symbols-table-chart-sharp',
    click: () => {
      utilsDownloadData({name: 'data', format: 'csv', data: props.data_filtered,})
    }
  }]
]
</script>