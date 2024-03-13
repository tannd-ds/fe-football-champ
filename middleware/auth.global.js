export default defineNuxtRouteMiddleware((to, from) => {

  const login_page = '/login';
  const regis_page = '/register';
  const auth_cookie = useCookie('auth');
  if (to.path == login_page || to.path == regis_page) {
    if (auth_cookie.value) {
      return navigateTo('/');
    } else {
      return;
    }
  } 
  // Logic for this: 
  // - If cookie is not present, user is not logged in => redirect to login
  // - If cookie is present, and cookie value = 0 => user is not admin
  // - If cookie is present, and cookie value = 1 => user is admin

  if (!auth_cookie.value) {
    return navigateTo(login_page);
  }
})