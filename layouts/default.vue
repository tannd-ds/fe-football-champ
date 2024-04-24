<template>
  <div class="flex items-center gap-4">
    <SidebarContainer />

    <div class="w-screen h-screen flex flex-row items-center justify-center">
      <slot></slot>
    </div>
  </div>
  <div class="w-screen h-screen -z-1 absolute top-0 left-0 -z-[1]">
    <div class="w-screen h-screen absolute top-0 left-0 bg-gradient-to-br from-primary to-teal-500"></div>
    <div class="bg-overlay w-full h-full absolute top-0 left-0"></div>
  </div>
</template>

<style>
.bg-overlay {
  background-color: #000;
  opacity: 0.7;
}
</style>
