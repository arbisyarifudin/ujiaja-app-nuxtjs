export default function({ store, redirect }) {
  const roleAllowed = ["admin", "superadmin", "superAdmin"];

  // If the user is not isAuth
  if (
    !store.state.isAuth ||
    (store.state.isAuth &&
      store.state.dataUser &&
      store.state.dataUser.user &&
      store.state.dataUser.user.role_user &&
      !roleAllowed.includes(store.state.dataUser.user.role_user))
  ) {
    return redirect("/administrator/login");
  }
}
