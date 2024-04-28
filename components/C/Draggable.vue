<template>
  <div class="flex gap-4 items-stretch justify-center">
    <div 
      v-for="list in props.lists"
      :key="list.id"
      class="min-h-[20px] w-[300px] p-4 bg-zinc-900 rounded-lg 
        border border-zinc-700
        transition-all duration-200 ease-in-out"
      @drop="on_drop($event, list)"
      @dragover.prevent
      @dragenter.prevent
    >
      <div class="font-bold text-lg">{{ list.name }}</div>
      <div 
        v-for="item in get_list(list.id)"
        :key="item.id"
      class="p-4 bg-zinc-800 bg-opacity-70 rounded-lg shadow-md my-2 truncate cursor-pointer"
        draggable="true"
        @dragstart="start_drag($event, item)"
      >
        {{ item.name }}
      </div>
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
})

const get_list = (list_id) => {
  return props.items.filter(item => item.list_id === list_id)
}

const start_drag = (event, item) => {
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('item_id', item.id);
}

const on_drop = (event, list) => {
  const item_id = event.dataTransfer.getData('item_id');
  const item = props.items.find(item => item.id == item_id);
  item.list_id = list.id;
}


</script>