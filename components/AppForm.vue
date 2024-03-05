<template>
  <AppCard>
    <div class="mb-4">
        <div class="font-black text-3xl">
            <slot name="header"></slot>
        </div>
        <slot name="subheader"></slot>

    </div>

    <slot name="main"></slot>
  </AppCard>
</template>

<script setup>

</script>