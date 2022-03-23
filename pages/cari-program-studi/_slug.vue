<template>
  <div>
    <HeaderProdiDetail :heroData="detail" :navData="navData" />
    <div class="program-studi program-studi-detail mb-5 mt-n5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-9 col-md-8">
            <div class="cari text-center pt-3 pb-5 mt-n3">
              <h3 class="mb-4 mt-5">Apa itu {{ detail.nama_studi }}?</h3>
              <div class="text-left" v-html="detail.deskripsi"></div>
              <h3 class="mb-3 mt-2">Kenapa Kamu Ingin Progran Studi Ini?</h3>
              <div class="text-left" v-html="detail.alasan"></div>
              <h3 class="mb-3 mt-2">
                Prospek Kerja/Karir Lulusan Program Studi Ini?
              </h3>
              <div class="text-left" v-html="detail.prospek"></div>

              <h3 class="mb-3 mt-2">
                Perguruan Tinggi yang Memiliki Program Studi Ini?
              </h3>
              <div class="text-left">
                <ol>
                  <li
                    v-for="(item, index) in detail.listperguruan"
                    :key="index"
                    class="mb-3 pl-3"
                  >
                    {{ item.perguruan ? item.perguruan.nama_perguruan : '' }}
                  </li>
                </ol>
              </div>

              <div
                class="mb-5"
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <!-- <div class="text-left">
                  <a href=""
                    ><i class="fab fa-facebook mr-1" style="color: #cdc1ff"></i
                  ></a>
                  <a href=""
                    ><i class="fab fa-twitter mr-1" style="color: #cdc1ff"></i
                  ></a>
                  <a href=""
                    ><i class="fab fa-linkedin mr-1" style="color: #cdc1ff"></i
                  ></a>
                  <a href=""
                    ><i class="fab fa-instagram mr1" style="color: #cdc1ff"></i
                  ></a>
                  <a href=""
                    ><i class="fab fa-whatsapp mr-1" style="color: #cdc1ff"></i
                  ></a>
                </div> -->
              </div>
            </div>
            <!-- <div
              class="cari text-center pt-3 pb-5 mt-n3"
              style="min-height: 400px; position: relative"
              v-else
            >
              <UILoading />
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <Footer :footerData="footerData" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.detail.nama_studi,
      bodyAttrs: {
        class: "bg-soft"
      }
    }
  },
  data() {
    return {
      // detail: {}
    };
  },
  async asyncData(context) {
    console.log(context);
    const slug = context.params.slug;
    if (!slug) return context.redirect("/cari-program-studi");
    const detail = await context.$axios
      .$get(`/api/program/studi/find/${slug}`)
      .then(res => {
        console.log(res);
        if (res.success) {
          return res.data;
        }
        return {};
      })
      .catch(err => {
        console.log(err);
        if (err.response && err.response.status == 404) {
          return context.redirect("/cari-program-studi");
        }
      });
    // console.log(detail);
    function getSetting(key) {
      const settings = context.store.state.dataSetting;
      const foundSetting = settings.find(item => item.key == key);
      if(foundSetting) {
        return foundSetting.isi;
      }
      return '';
    }

    const navData = {
      logo: getSetting('logo'),
    }

    const footerData = {
      logo: getSetting('logo'),
      alamat_kantor: getSetting('alamat_kantor'),
      telp: getSetting('telp'),
      whatsapp: getSetting('whatsapp'),
      instagram: getSetting('instagram'),
      facebook: getSetting('facebook'),
      youtube: getSetting('youtube'),
      email: getSetting('email'),
    }
    return {
      detail,
      navData,
      footerData
    };
  },
  created() {
    if (!this.$route.params.slug)
      return this.$router.replace("/cari-program-studi");
    this.getDetail("program/studi", this.$route.params.slug);
  },
  methods: {
    getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.detail = res.data;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          if (err.response && err.response.status == 404) {
            return this.$router.replace("/cari-program-studi");
          }
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
