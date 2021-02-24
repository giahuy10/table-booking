const Cookie = process.client ? require("js-cookie") : undefined;

export default function ({ $axios, store, redirect  }) {
  $axios.onRequest(function(config) {
    if (store.state.auth) {
      let auth = store.state.auth
      config.headers.common['Authorization'] = 'Bearer ' + auth.access_token
    } else {
      config.headers.common['Authorization'] = ''
    }
  })
  $axios.onError(error => {
    if (error && error.response) {
      if(error.response.status === 404) {
        redirect('/err/404')
      } else if(error.response.status === 403) {
        //redirect('/err/403')
      } else if(error.response.status === 401) {
        if(error.response.data.message == 'Unauthenticated.'){
          Cookie.remove("auth");
          store.commit('setAuth', null);
          localStorage.removeItem("menus");
          localStorage.removeItem("codes");
          redirect('/user/login');
        }
      }
    }
  })
}
