import { inject, ref, computed } from 'vue';
import { useDebounceFn } from '@vueuse/core';

const useFormGroup = (inputProps, config) => {
  var _a;
  const formBus = inject("form-events", void 0);
  const formGroup = inject("form-group", void 0);
  if (formGroup) {
    formGroup.inputId.value = (_a = inputProps == null ? void 0 : inputProps.id) != null ? _a : formGroup == null ? void 0 : formGroup.inputId.value;
  }
  const blurred = ref(false);
  function emitFormEvent(type, path) {
    if (formBus) {
      formBus.emit({ type, path });
    }
  }
  function emitFormBlur() {
    emitFormEvent("blur", formGroup == null ? void 0 : formGroup.name.value);
    blurred.value = true;
  }
  function emitFormChange() {
    emitFormEvent("change", formGroup == null ? void 0 : formGroup.name.value);
  }
  const emitFormInput = useDebounceFn(() => {
    if (blurred.value) {
      emitFormEvent("input", formGroup == null ? void 0 : formGroup.name.value);
    }
  }, 300);
  return {
    inputId: computed(() => {
      var _a2;
      return (_a2 = inputProps.id) != null ? _a2 : formGroup == null ? void 0 : formGroup.inputId.value;
    }),
    name: computed(() => {
      var _a2;
      return (_a2 = inputProps == null ? void 0 : inputProps.name) != null ? _a2 : formGroup == null ? void 0 : formGroup.name.value;
    }),
    size: computed(() => {
      var _a3, _b;
      var _a2;
      return (_b = (_a3 = inputProps == null ? void 0 : inputProps.size) != null ? _a3 : formGroup == null ? void 0 : formGroup.size.value) != null ? _b : (_a2 = config == null ? void 0 : config.default) == null ? void 0 : _a2.size;
    }),
    color: computed(() => {
      var _a2;
      return ((_a2 = formGroup == null ? void 0 : formGroup.error) == null ? void 0 : _a2.value) ? "red" : inputProps == null ? void 0 : inputProps.color;
    }),
    emitFormBlur,
    emitFormInput,
    emitFormChange
  };
};
let _id = 0;
function uid() {
  return `nuid-${_id++}`;
}

export { uid as a, useFormGroup as u };
//# sourceMappingURL=uid-661a8ef2.mjs.map
