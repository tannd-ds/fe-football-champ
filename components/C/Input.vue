<template>
  <UFormGroup :required="props.isRequired" size="xl" :label="props.label" :name="props.name">
    <UInput 
      :type="props.inputType"
      :value="modelValue"
      variant="outline"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </UFormGroup>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  inputType: {
    type: String,
    default: 'text'
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
})

</script>