export default function({ store, redirect }) {
  // If the user is isAuth
  if (store.state.isAuth && store.state.dataUser && store.state.dataUser.user) {
    const user = store.state.dataUser.user;
    let path;
    switch (user.role_user) {
      case "siswa":
        path = "/app/dashboard";
        break;
      case "parent":
        path = "/app/dashboard";
        break;
      case "teacher":
        path = "/app/dashboard";
        break;
      case "superAdmin":
        path = "/administrator/dashboard";
        break;
      case "admin":
        path = "/administrator/dashboard";
        break;
      default:
        path = "/app/dashboard";
        break;
    }
    return redirect(path);
  }
}
