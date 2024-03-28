export default function({ store, redirect }) {
  // If the user is isAuth
  if (store.state.isAuth && store.state.dataUser && store.state.dataUser.user) {
    const user = store.state.dataUser.user;
    let path;
    switch (user.role_user) {
      case "siswa":
        path = "/user/dashboard";
        break;
      case "parent":
        path = "/user/dashboard";
        break;
      case "teacher":
        path = "/user/dashboard";
        break;
      case "superAdmin":
        path = "/administrator/dashboard";
        break;
      case "admin":
        path = "/administrator/dashboard";
        break;
      default:
        path = "/user/dashboard";
        break;
    }
    return redirect(path);
  }
}
