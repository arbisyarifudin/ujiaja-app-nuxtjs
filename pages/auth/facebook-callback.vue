<template>
  <div class="loading">
    Authenticating... Please wait.
  </div>
</template>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>

<script>

export default {
  head() {
    return {
      title: 'Authenticating...',
      bodyAttrs: {
        class: "bg-soft"
      }
    }
  },
  async created() {
    const hash = this.$route.hash // #state=123&access_token=123
    let query = this.$route.query

    if (!query || (query && Object.keys(query).length === 0)) {
      query = hash
        .substring(1)
        .split('&')
        .reduce((acc, item) => {
          const [key, value] = item.split('=')
          acc[key] = value
          return acc
        }, {})
    }

    // console.log('query', query)

    // get access token
    const { code, access_token } = query
    const token = code || access_token

    if (token) {
      // get tipe_user from local storage
      let tipe_user = localStorage.getItem('tipe_user')

      if (tipe_user === 'tentor') {
        tipe_user = 'teacher'
      }

      await this.$axios.$post('/api/social/facebook-auth', {
        token: token,
        role: tipe_user || ''
      })
        .then((res) => {
          console.log('res', res)

          this.$bvToast.toast(
            'Otentikasi facebook berhasil',
            {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 5000,
            }
          );

          console.log('res.data', res.data)
          if (res.data) {
            this.$cookiz.set("_ujiaja", res.data.token, {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            });
            this.$store.commit("SET_IS_AUTH", true);
            this.$store.commit("set", ["dataUser", res.data]);

            this.$auth.setUser(res.data)
            this.$auth.setUserToken(res.data.token)
          }

          // this.$router.replace("/user/dashboard");
          window.location.href = window.origin + "/user/dashboard";
        })
        .catch((err) => {
          console.log('err', err)
          const message = err.response?.data?.message || err.response?.message || 'Otentikasi facebook gagal'
          this.$bvToast.toast(message, {
            title: "Error",
            variant: "danger",
            solid: true,
            autoHideDelay: 5000,
          });

          // redirect
          window.location.href = window.origin + "/masuk";
        })
    }
  }
}

</script>
