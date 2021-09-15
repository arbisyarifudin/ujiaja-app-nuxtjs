export default function({ store, redirect }) {
  // If the user is not isAuth
  const users = ["siswa", "guru", "teacher", "tentor", "parent", "student"];
  // console.log(store.state.dataUser);
  // return;
  if (
    !store.state.isAuth ||
    (store.state.dataUser &&
      store.state.dataUser.user &&
      !store.state.dataUser.user.role_user.includes(...users))
  ) {
    return redirect("/masuk");
  }
}
