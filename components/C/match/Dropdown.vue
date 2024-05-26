<template>
  <UDropdown 
    :items="items" 
    :popper="{ placement: 'top-end' }"
  >
    <UButton 
      color="white" 
      label="" 
      variant="ghost"
      icon="i-heroicons-ellipsis-vertical" 
    />
  </UDropdown>
</template>

<script setup>

const props = defineProps({
  match: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update-date', 'delete']);

const router = useRouter();
const route =  useRoute();
const toasts = useToast();

const items = [
  [{
    label: 'Xem Chi Tiết',
    icon: 'i-heroicons-eye-20-solid',
    click: () => {
      router.push(`/match/${props.match.schedule_id}`);
    }
  }, {
    label: 'Xếp Lịch',
    icon: 'i-material-symbols-calendar-add-on',
    click: () => {
      emit('update-date');
    }
  }], [{
    label: 'Xóa',
    icon: 'i-heroicons-trash-20-solid',
    click: async () => {
      if (!confirm('Bạn có chắc chắn muốn xóa Trận đấu này không?'))
        return;

      const { data: res } = await useFetch('http://localhost:8000/api/match/delete/' + props.match.schedule_id);
      
      if (res.value.code == 200) {
        toasts.add({
          title: 'Thành công',
          description: 'Xóa Trận Đấu thành công',
          color: 'green',
        })
        emit('delete');
      } else if (res.value.code == 500) {
        toasts.add({
          title: 'Thất bại',
          description: res.value.content,
          color: 'red',
        })
      }
    }
  }]
]
</script>