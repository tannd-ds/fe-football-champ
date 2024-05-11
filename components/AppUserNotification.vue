<template>
  <TransitionRoot as="template" :show="props.open">
    <Dialog 
      as="div" 
      class="relative z-10" 
      @close="$emit('close')"
    >
      <TransitionChild 
        as="template" 
        enter="ease-in-out duration-200" 
        enter-from="opacity-0" 
        enter-to="opacity-100" 
        leave="ease-in-out duration-200" 
        leave-from="opacity-100" 
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-zinc-800 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
            <TransitionChild 
              as="template" 
              enter="transform transition ease-in-out duration-300 sm:duration-500" 
              enter-from="-translate-x-full" 
              enter-to="translate-x-0" 
              leave="transform transition ease-in-out duration-300 sm:duration-500" 
              leave-from="translate-x-0" 
              leave-to="-translate-x-full"
            >
              <DialogPanel class="pointer-events-auto relative w-screen max-w-md">
                <TransitionChild 
                  as="template" 
                  enter="ease-in-out duration-300" 
                  enter-from="opacity-0" 
                  enter-to="opacity-100" 
                  leave="ease-in-out duration-300" 
                  leave-from="opacity-100" 
                  leave-to="opacity-0"
                >
                  <div class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4"></div>
                </TransitionChild>

                <AppCard class="h-[98vh] flex-col shadow-xl">
                  <div class="h-full flex flex-col overflow-auto">
                    <div class="mb-8 px-4 sm:px-6">
                      <DialogTitle class="text-3xl font-bold leading-6">Thông Báo</DialogTitle>
                    </div>
                    <slot name="content"></slot>
                  </div>
                </AppCard>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const props = defineProps({
  open: Boolean,
})

defineShortcuts({
  'esc': () => { $emit('update:open', false) }
})

</script>