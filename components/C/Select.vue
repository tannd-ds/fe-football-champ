<template>
  <UFormGroup :required="props.isRequired" size="xl" :label="props.label" :name="props.name">
    <USelect 
      :value="props.modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
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

</script>