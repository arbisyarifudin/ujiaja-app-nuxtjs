<template>
  <div>
    <Header variant="melengkung" :heroData="header.hero" :navData="navData" />
    <div class="section section-keunggulan">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-12 text-center">
            <h2>Pantau kemajuan belajar anak Anda</h2>
          </div>
        </div>
        <div v-for="(ung, indexUng) in keunggulan" :key="indexUng">
          <div class="row mb-md-5" v-if="ung.posisi == 'kanan'">
            <div class="col-md-12 text-center">
              <div class="row">
                <div class="col-md-6 text-left order-2 order-md-1">
                  <h3 class="h5">{{ ung.judul }}</h3>
                  <p>
                    {{ ung.text }}
                  </p>
                </div>
                <div class="col-md-6 order-1 order-md-2">
                  <img
                    :src="formatImageSource(ung.card)"
                    class="img-fluid mb-3 mb-md-0"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-else>
            <div class="col-md-12 text-center">
              <div class="row">
                <div class="col-md-6">
                  <img
                    :src="formatImageSource(ung.card)"
                    class="img-fluid mb-3 mb-md-0"
                  />
                </div>
                <div class="col-md-6 text-left">
                  <h3 class="h5">{{ ung.judul }}</h3>
                  <p>
                    {{ ung.text }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SectionTestimoni :props="testimoni" />
    <Footer :footerData="footerData" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Untuk Orangtua",
    };
  },
  data() {
    return {
      header: {
        hero: {
          judul:
            "Solusi Belajar Online di UjiAja, lebih mudah, detail dan fleksibel!",
          subjudul:
            "Kini para orangtua dapat lebih mudah memantau perkembangan belajar anak, dan berkonsultasi dengan guru/tentor privat pendampingnya, dimana saja dan kapan saja.",
          ctaButtonText: "Pantau Perkembangan Anak",
          ctaButtonVariant: "secondary",
          cataButtonUrl: "/registrasi",
          image: "/bannerortu_3.png",
          isJudulFirst: false,
        },
      },
      keunggulan: {
        judul: "Mengapa harus bergabung dengan Les privat",
        item: [],
      },
      testimoni: {
        judul: "Salah satu testimoni orang tua",
        deskripsi: "",
        varian: "secondary",
        item: [],
      },
    };
  },
  asyncData(context) {
    function getSetting(key) {
      const settings = context.store.state.dataSetting;
      const foundSetting = settings.find((item) => item.key == key);
      if (foundSetting) {
        return foundSetting.isi;
      }
      return "";
    }

    const navData = {
      logo: getSetting("logo"),
    };

    const footerData = {
      logo: getSetting("logo"),
      alamat_kantor: getSetting("alamat_kantor"),
      telp: getSetting("telp"),
      whatsapp: getSetting("whatsapp"),
      instagram: getSetting("instagram"),
      facebook: getSetting("facebook"),
      youtube: getSetting("youtube"),
      email: getSetting("email"),
    };

    return {
      navData,
      footerData,
    };
  },
  async fetch() {
    try {
      const resContent = await this.$axios.get("/api/cms/orang-tua/get");
      const res = resContent.data;
      console.log(res.data);
      if (resContent.data.success) {
        this.setHeroSection(res.data.dataContent1[0]);
        this.setContent2Section(res.data.dataContent2);
        this.testimoni.item = [res.data.dataContent3[0]];
      }
    } catch (error) {
      console.error(error);
    }
  },
  created() {
    // console.log(this.$store.getters['checkIsAuth'])
    if (this.$store.getters["checkIsAuth"]) {
      this.header.hero.ctaButtonText = "Pergi ke Dashboard";
      this.header.hero.cataButtonUrl = "/app/dashboard";
    }
  },
  methods: {
    formatImageSource(endpoint) {
      return process.env.apiUrl + `/storage/${endpoint}`;
    },
    setHeroSection(content) {
      this.header.hero.judul = content.judul;
      this.header.hero.subjudul = content.text;
      this.header.hero.ctaButtonText = content.tombol;
      this.header.hero.ctaButtonUrl = content.link;
      this.header.hero.image = content.gambar;
    },
    setContent2Section(contents) {
      for (
        let indexContent = 0;
        indexContent < contents.length;
        indexContent++
      ) {
        if (contents[indexContent].id_content == 0) {
          this.keunggulan.judul = contents[indexContent].judul;
        } else {
          this.keunggulan.item.push(contents[indexContent]);
        }
      }
    },
  },
};
</script>
