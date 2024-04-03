export default function({ store, redirect, app }) {
  const roleAllowed = [
    "siswa",
    "guru",
    "teacher",
    "tentor",
    "parent",
    "student"
  ];

  // console.log("store.state", store.state);

  // If the user is not authenticated
  if (store.state.auth && !store.state.auth.loggedIn) {
    app.$cookiz.remove('_ujiaja')
    return redirect("/masuk");
  }
  
  // If the user is not isAuth
  if (
    !store.state.isAuth ||
    (store.state.isAuth &&
      store.state.dataUser &&
      store.state.dataUser.user &&
      store.state.dataUser.user.role_user &&
      !roleAllowed.includes(store.state.dataUser.user.role_user))
  ) {
    return redirect("/masuk");
  } 
}
