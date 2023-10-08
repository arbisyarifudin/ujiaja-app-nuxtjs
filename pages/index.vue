<template>
  <div>
    <HeaderCaraousel
      v-if="heros.length > 0"
      :heroData="heros"
      :navData="navData"
    />
    <!-- <Header :heroData="heros" :navData="navData"/> -->

    <SectionKeunggulan :props="keunggulan" variant="with-bg" />
    <SectionProduk v-if="produk.item.length > 0" :props="produk" />
    <SectionFitLayanan v-if="layanan.item.length > 0" :props="layanan" />
    <SectionCardHero
      :src="formatImageSource(konten5.gambar)"
      :title="konten5.judul"
      :description="konten5.text"
      :href="konten5.link"
      :cta-text="konten5.tombol"
    />
    <SectionTryoutAkbar :props="tryOut" />
    <SectionProgramStudi :props="programStudi" />
    <SectionCardHero
      :src="formatImageSource(konten9.gambar)"
      :title="konten9.judul"
      :description="konten9.text"
      :href="konten9.link"
      :cta-text="konten9.tombol"
      button
    />
    <Footer :footerData="footerData" />
    <WhatsAppFloating :wa="footerData.whatsapp" />
  </div>
</template>

<script>
import WhatsAppFloating from "../components/WhatsAppFloating.vue";
import HeaderCaraousel from "../components/HeaderCaraousel.vue";

export default {
  head() {
    return {
      title: this.navData.seo_web_name ?? "Ujiaja.com",
      titleTemplate: "%s",
    };
  },
  data() {
    return {
      heros: [],
      keunggulan: {
        judul: "Kenapa Harus Pakai UjiAja.com?",
        item: [],
      },
      produk: {
        judul: "",
        deskripsi: "",
        item: [],
      },
      layanan: {
        judul: "",
        deskripsi: "",
        item: [],
      },
      konten5: {},
      tryOut: {},
      programStudi: {},
      testimoni: {
        judul: "",
        deskripsi: "",
        item: [],
      },
      konten9: {},
    };
  },
  async asyncData(context) {
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
      seo_web_name: getSetting("seo_web_name"),
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
      const resContent = await this.$axios.get("/api/cms/halaman-utama/get");
      const res = resContent.data;
      console.log(res.data);
      if (resContent.data.success) {
        this.heros = res.data.dataContent1;
        this.keunggulan.item = res.data.dataContent2;
        this.setProductSection(res.data.dataContent3);
        this.setLayananSection(res.data.dataContent4);
        this.konten5 = res.data.dataContent5.length == 0 ? {} : res.data.dataContent5[0];
        this.tryOut = res.data.dataContent6.length == 0 ? {} : res.data.dataContent6[0];
        this.programStudi = res.data.dataContent7.length == 0 ? {} : res.data.dataContent7[0];
        this.setTestimoniSection(res.data.dataContent8);
        this.konten9 = res.data.dataContent9.length == 0 ? {} : res.data.dataContent9[0];
      }
    } catch (error) {
      console.error(error);
    }
  },
  created() {
    // console.log(this.$store.getters['checkIsAuth'])
    if (this.$store.getters["checkIsAuth"]) {
      // this.header.hero.ctaButtonText = "Pergi ke Dashboard";
      // this.header.hero.cataButtonUrl = "/app/dashboard";
    }
  },
  components: { WhatsAppFloating, HeaderCaraousel },
  methods: {
    formatImageSource(endpoint) {
      return process.env.apiUrl + `/storage/${endpoint}`;
    },
    setProductSection(contents) {
      for (let indexContent = 0; indexContent < contents.length; indexContent++) {
        if (contents[indexContent].id_content == 0) {
          this.produk.judul = contents[indexContent].judul;
          this.produk.deskripsi = contents[indexContent].text;
        } else {
          this.produk.item.push(contents[indexContent]);
        }
      }
      this.produk.item[0].gambar = '/produk/produk1_2.png';
      this.produk.item[1].gambar = '/produk/produk2_2.png';
    },
    setLayananSection(contents) {
      for (let indexContent = 0; indexContent < contents.length; indexContent++) {
        if (contents[indexContent].id_content == 0) {
          this.layanan.judul = contents[indexContent].judul;
          this.layanan.deskripsi = contents[indexContent].text;
        } else {
          this.layanan.item.push(contents[indexContent]);
        }
      }
    },
    setTestimoniSection(contents) {
      for (let indexContent = 0; indexContent < contents.length; indexContent++) {
        if (contents[indexContent].id_content == 0) {
          this.testimoni.judul = contents[indexContent].judul;
          this.testimoni.deskripsi = contents[indexContent].text;
        } else {
          this.testimoni.item.push(contents[indexContent]);
        }
      }
    }
  },
};
</script>
