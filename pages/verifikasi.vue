<template>
  <div>
    <Header class="headerdua no-bg mx-lg-5" :navData="navData" />
    <ContentWrapper>
      <b-container>
        <div
          class="login-box d-flex align-items-center justify-content-center w-100"
          style="
            min-height: 60vh
          "
        >
          <div
            v-if="loading"
            style="min-width: 400px; max-width: 100%; min-height: 100px; background: rgba(255,255,255,0.5);  box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.1); border-radius: 10px;"
            class="d-flex align-items-center justify-content-center"
          >
            <b-spinner small class="mr-1"></b-spinner> Sedang memverifikasi...
          </div>
        </div>
      </b-container>
    </ContentWrapper>
    <Footer :footerData="footerData" />
  </div>
</template>

<script>
import ContentWrapper from "@/components/Layout/ContentWrapper";
export default {
  middleware: "auth-guest",
  components: { ContentWrapper },
  head() {
    return {
      title: "Verifikasi"
    };
  },
  asyncData(context) {
    function getSetting(key) {
      const settings = context.store.state.dataSetting;
      const foundSetting = settings.find(item => item.key == key);
      if (foundSetting) {
        return foundSetting.isi;
      }
      return "";
    }

    const navData = {
      logo: getSetting("logo")
    };

    const footerData = {
      logo: getSetting("logo"),
      alamat_kantor: getSetting("alamat_kantor"),
      telp: getSetting("telp"),
      whatsapp: getSetting("whatsapp"),
      instagram: getSetting("instagram"),
      facebook: getSetting("facebook"),
      youtube: getSetting("youtube"),
      email: getSetting("email")
    };

    return {
      navData,
      footerData
    };
  },
  data() {
    return {
      loading: true
    };
  },
  mounted() {
    if (!this.$route.query.token) {
      return this.$router.replace("/masuk");
    }
    this.loading = true;
    this.$axios
      .$get("/api/verifikasi/" + this.$route.query.token)
      .then(response => {
        console.log(response);
        this.$root.$bvToast.toast(
          "Verifikasi berhasil! Anda akan segera dialihkan ke halaman dashboard aplikasi kami.",
          {
            title: "Sukses",
            variant: "success",
            solid: true,
            autoHideDelay: 3000
          }
        );
        if (response.data) {
          this.$cookiz.set("_ujiaja", response.data.token, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7
          });
          this.$store.commit("SET_IS_AUTH", true);
          this.$store.commit("set", ["dataUser", response.data.user]);
          window.location.href = window.origin + "/user/dashboard";
        }
        return
      })
      .catch(error => {
        console.log(error);
        this.$root.$bvToast.toast(
          "Token tidak valid!",
          {
            title: "Error",
            variant: "danger",
            solid: true,
            autoHideDelay: 3000
          }
        );
        return this.$router.replace("/masuk");
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>
