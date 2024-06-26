// content of plugins/axios.js

/* 
// This is a global config declaration that works on any axios instance,
// meaning that if you just import axios from 'axios' in any place, you will get those.
// This will also work on the axios instance that nuxt creates and injects.

import axios from 'axios'

axios.defaults.xsrfHeaderName = 'x-csrftoken'
axios.defaults.xsrfCookieName = 'csrftoken'
*/
export default function({ $axios, $cookiz }) {
  // This is a nuxt specific instance config, this will work in
  // everyplace where nuxt inject axios, like Vue components, and store

  // function getCookie(name) {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2)
  //     return parts
  //       .pop()
  //       .split(";")
  //       .shift();
  // }

  // $axios
  //   .$get("/sanctum/csrf-cookie", {
  //     withCredentials: true
  //   })
  //   .catch(err => this.catchError(err));

  //   $axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN";
  //   $axios.defaults.xsrfCookieName = "XSRF-TOKEN";
  // $axios.defaults.headers.post["X-XSRF-TOKEN"] = $cookiz.get("XSRF-TOKEN");
  // $axios.defaults.headers.put["X-XSRF-TOKEN"] = $cookiz.get("XSRF-TOKEN");
  // $axios.defaults.headers.delete["X-XSRF-TOKEN"] = $cookiz.get("XSRF-TOKEN");
  // $axios.defaults.headers.Authorization = "Bearer " + getCookie("_ujiaja");

  if ($cookiz.get("_ujiaja")) {
    // $axios.defaults.headers.Authorization = "Bearer " + $cookiz.get("_ujiaja");
    $axios.setHeader("Authorization", "Bearer " + $cookiz.get("_ujiaja"));
  } else {
    // $axios.defaults.headers.Authorization = null;
    $axios.setHeader("Authorization", null);
  }
  
  $axios.defaults.withCredentials = true;


  
  // console.log($axios.defaults.headers.Authorization);
}
