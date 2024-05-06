<template>
  <div class="flex items-center gap-4">
    <SidebarContainer />

    <div class="w-screen h-screen mr-3 flex flex-row items-center justify-center">
      <slot></slot>
    </div>
  </div>
  <div class="w-screen h-screen -z-1 absolute top-0 left-0 -z-[1] overflow-hidden">
    <div class="bg-cover w-screen h-screen"></div>
    <div class="bg-overlay w-full h-full absolute top-0 left-0"></div>
  </div>
</template>

<style>

.bg-cover {
  background-image: url('/imgs/bg_main_00.jpg');
  background-size: cover;
}

.bg-overlay {
  background-color: #000;
  opacity: 0.5;
}
</style>
