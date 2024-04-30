export default defineNuxtRouteMiddleware((to, from) => {

  const login_page = '/login';
  const regis_page = '/register/account';
  const auth_cookie = useCookie('auth');
  const { value: usr_info } = useCookie('usr_info');
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

  if (auth_cookie.value == undefined) {
    return navigateTo(login_page);
  }

  if (usr_info.role == 0) {
    setPageLayout('user');
    // if (to.query.public == 'true') {
    //   return;
    // }
    // if (!to.path.startsWith('/u/')) {
    //   // If user is not admin, 
    //   // and user is trying to access admin page, 
    //   // redirect to user page
    //   return navigateTo(`/u${to.path}`);
    // }
  } else {
    setPageLayout('default');
    // if (to.path.startsWith('/u/')) {
    //   // Same as above, but for admin
    //   return navigateTo(to.path.replace('/u', ''));
    // }
  }

})