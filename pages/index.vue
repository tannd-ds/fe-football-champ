<template>
    <AppForm class="w-[768px]">
        Hello world
    </AppForm>
</template>

<script setup>
let season = await useFetch('http://localhost:8000/api/season/get');
</script>
