<template>
  <div class="grid grid-cols-2 items-center gap-4">
    <div class="h-screen flex flex-row items-center justify-center">
      <slot></slot>
    </div>
    <div class="w-full h-full flex items-center justify-center">
      <img src="/imgs/soccer_illustration.png" />
    </div>
  </div>
  <div class="w-screen h-screen -z-1 absolute top-0 left-0 -z-[1]">
    <div class="bg-overlay w-full h-full absolute top-0 left-0"></div>
  </div>
</template>

<style>
.bg-overlay {
  background-color: #000;
  opacity: 0.3;
}
</style>
