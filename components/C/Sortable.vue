<template>
  <div>
    <div 
      v-for="list in props.lists"
      :key="list.id"
      class="min-h-[20px]"
      @drop="on_drop($event, list)"
      @dragover.prevent
      @dragenter.prevent
    >
      <UButton 
        v-for="item in get_list(list.id)"
        :key="item.id"
        color="white"
        variant="ghost"
        icon="i-material-symbols-drag-handle-rounded"
        draggable="true"
        @dragstart="start_drag($event, item)"
      >
        {{ item.name }}
      </UButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  lists: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  onlyOneItemPerList: {
    type: Boolean,
    default: false,
  },
  itemSwapOnDrop: {
    type: Boolean,
    default: false,
  },
})

const get_list = (list_id) => {
  return props.items.filter(item => item.list_id === list_id)
}

const start_drag = (event, item) => {
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('item_id', item.id);
  event.dataTransfer.setData('from', item.list_id);
}

const on_drop = (event, list) => {
  const item_id = event.dataTransfer.getData('item_id');
  const item = props.items.find(item => item.id == item_id);
  item.list_id = list.id;

  if (props.itemSwapOnDrop) {
    const from = event.dataTransfer.getData('from');
    for (const item of get_list(list.id)) {
      if (item.id == item_id)
        continue;
      item.list_id = parseInt(from);
    }
    return
  }
}


</script>