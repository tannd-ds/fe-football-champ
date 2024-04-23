<template>
  <div 
    class="flex flex-col items-center"
    @click="$emit('open')"
  >

    <div v-if="img_src" class="w-32 h-32 overflow-hidden rounded-lg">
      <img :src="img_src" alt="soccer_img" class="w-32 h-32" />
    </div>


    <div v-else
      class="w-32 h-32 flex flex-col items-center justify-center gap-2
            border-2 border-dashed border-gray-500 rounded-lg 
            p-4 text-gray-500 cursor-pointer hover:bg-zinc-800 transition-all duration-200 ease-in-out" 
      type="button" 
      variant="soft" 
      color="sky"
    >
      <UIcon name="i-heroicons-cloud-arrow-up" class="text-4xl" />
      <span class="text-sm font-bold">Ảnh Đại Diện</span>
    </div>

  </div>
</template>

<script setup>
defineProps({
  img_src: String,
  open: Function,
})



</script>