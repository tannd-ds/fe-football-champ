import { defineStore } from "pinia";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRenameMeStore = defineStore("rename_me", () => {
  // other options...
  const foo = ref(0);

  const increase_foo = () => {
    foo.value++;
  };

  return { foo, increase_foo }; // Remember to return anything
});
