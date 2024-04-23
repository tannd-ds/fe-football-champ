<template>
  <UFormGroup :required="props.isRequired" size="xl" :label="props.label" :name="props.name">
    <USelectMenu
      v-model="selected"
      :options="props.options" 
      option-attribute="name"
    />
  </UFormGroup>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  isRequired: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
});

let emit = defineEmits(['update:modelValue']);

const selected = ref('');

watch(() => selected.value, (val) => {
  emit('update:modelValue', String(val.value));
})
</script>