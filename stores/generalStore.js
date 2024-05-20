import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", () => {
  const n_elements = ref(0);

  const increase_n_elements = () => {
    n_elements.value++;
  };

  const reset_n_elements = () => {
    n_elements.value = 0;
  };

  return { n_elements, increase_n_elements, reset_n_elements };
});
