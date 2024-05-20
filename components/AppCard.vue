<template>
  <div class="p-8 relative flex justify-center rounded-xl bg-zinc-900 bg-opacity-90 card-fade-in"
    :style="{ animationDelay: utilsRandomDelay()}"
  >
    <div class="w-full h-full">
      <slot></slot>
    </div>
  </div>
</template>