import { useGeneralStore } from "~/stores/generalStore";
export default defineNuxtRouteMiddleware((to, from) => {
  // Reset the number of elements when navigating to a new page
  useGeneralStore().reset_n_elements();
});