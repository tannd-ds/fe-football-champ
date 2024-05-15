<template>
  <CSelect
    :is-required="isRequired"
    v-model="selected"
    :options="team_options"
    label="Đội Bóng"
    name="team_id"
  />
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  isRequired: {
    type: Boolean,
    default: false
  },
  initValue: {
    type: String,
    default: ''
  },
  nullOption: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

let selected = ref(props.initValue);
watch(() => selected.value, (val) => {
  emit('update:modelValue', String(val));
});

const { data: team_list } = await useFetch('http://localhost:8000/api/team/get');
const team_options = team_list.value.map((team) => {
  return {
    name: team.name_team,
    value: team.id,
    avatar: {
      src: `http://localhost:8000/api/get_img/team__${team.url_image}`,
      alt: team.name_team,
    },
  }
})

if (props.nullOption) {
  team_options.unshift({
    name: 'Không',
    value: null,
  });
}

</script>