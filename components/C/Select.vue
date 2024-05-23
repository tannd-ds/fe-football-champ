<template>
  <UFormGroup :required="props.isRequired" size="xl" :label="props.label" :name="props.name">
    <USelectMenu
      v-model="selected"
      :options="props.options" 
      option-attribute="name"
      :disabled="props.disabled"
      placeholder="Lựa chọn..."
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
  disabled: {
    type: Boolean,
    default: false
  }
});

let emit = defineEmits(['update:modelValue']);

const selected = ref('');

// Initialize selected value
selected.value = props.options.find(
  (option) => option.value == props.modelValue
)?.name || '';

watch(() => selected.value, (val) => {
  emit('update:modelValue', String(val.value));
})
</script>