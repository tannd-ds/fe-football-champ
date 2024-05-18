export default defineNuxtRouteMiddleware((to, from) => {

  const login_page = '/login';
  const regis_page = '/register/account';
  const forget_password_page = '/forget_password';
  const auth_cookie = useCookie('auth');
  const { value: usr_info } = useCookie('usr_info');
  if (to.path == login_page || to.path == regis_page || to.path == forget_password_page) {
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

  if (auth_cookie.value == undefined) {
    return navigateTo(login_page);
  }

  if (usr_info.role == 0 || usr_info.role == 2) {
    setPageLayout('user');
  } else {
    setPageLayout('default');
  }

})