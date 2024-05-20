<template>
  <div 
    class="p-4 min-w-[64px] rounded-md flex flex-col justify-center items-center gap-2 cursor-pointer 
        hover:-translate-y-1 transition-all duration-300 ease-in-out"
    :class="{
      'bg-zinc-800 text-zinc-100 hover:bg-zinc-600': isActive,
      'bg-zinc-900 text-zinc-100 hover:bg-zinc-800': !isActive,
    }"
    @click="onClick"
    >
    <slot name="icon">
      <UIcon name="i-heroicons-calendar-20-solid" class="text-2xl" />
    </slot>
    <div class="font-bold text-center">
      <slot name="text">
        Item X
      </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  onClick: {
    type: Function,
    default: () => {},
  }
})

</script>