<template>
  <div>
    <Header variant="melengkung" :heroData="header.hero" :navData="navData" />
    <SectionKeunggulan :props="keunggulan" />
    <SectionCardHero
      :src="formatImageSource(content3.gambar)"
      :title="content3.judul"
      :description="content3.text"
      :href="content3.link"
      :cta-text="content3.tombol"
      button
    />
    <SectionLangkah v-if="langkah.langkah.length > 0" :props="langkah" />
    <SectionCardHero
      v-if="content6 && Object.keys(content6).length != 0"
      :src="formatImageSource(content6.gambar)"
      :title="content6.judul"
      :description="content6.text"
      :href="content6.link"
      :cta-text="content6.tombol"
      button
    />
    <Footer :footerData="footerData" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Untuk Siswa",
    };
  },
  data() {
    return {
      header: {
        hero: {
          judul: "Wujudkan Sekolah dan Kuliah Impianmu!",
          subjudul:
            "Raih nilai tinggi di sekolahmu, dan maksimalkan potensi kuliahmu dengan pilihan jurusan yang tepat sesuai minat, bakat, dan kemampuanmu.",
          ctaButtonText: "Tes Sekarang Juga",
          ctaButtonVariant: "secondary",
          cataButtonUrl: "/registrasi",
          image: "/banneruntuksiswa_3.png",
          isJudulFirst: false,
        },
      },
      keunggulan: {
        judul: "Mengapa harus tes minat bakat di UjiAja?",
        item: [],
      },
      content3: {},
      langkah: {
        judul: "Langkah Mengerjakan Tes Minat & Bakat",
        langkah: [],
      },
      testimoni: {
        judul: "Apa Kata Mereka Tentang tes ini?",
        deskripsi: "",
        varian: "secondary",
        item: [],
      },
      content6: {},
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
      const resContent = await this.$axios.get("/api/cms/siswa/get");
      const res = resContent.data;
      console.log(res.data);
      if (resContent.data.success) {
        this.setHeroSection(res.data.dataContent1[0]);
        this.setContent2Section(res.data.dataContent2);
        this.content3 = res.data.dataContent3[0];
        this.setContent4Section(res.data.dataContent4);
        this.setTestimoniSection(res.data.dataContent5);
        this.content6 = res.data.dataContent6[0];
      }
    } catch (error) {
      console.error(error);
    }
  },
  created() {
    // console.log(this.$store.getters['checkIsAuth'])
    if (this.$store.getters["checkIsAuth"]) {
      this.header.hero.ctaButtonText = "Pergi ke Dashboard";
      this.header.hero.cataButtonUrl = "/user/dashboard";
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
      if (content.gambar != undefined) {
        this.header.hero.image = content.gambar;
      }
    },
    setContent2Section(contents) {
      for (const content of contents) {
        if (content.id_content == 0) {
          this.keunggulan.judul = content.judul;
        } else {
          this.keunggulan.item.push(content);
        }
      }
    },
    setContent4Section(contents) {
      for (const content of contents) {
        this.langkah.langkah.push({
          judul: content.judul,
          deskripsi: content.text,
        });
      }
    },
    setTestimoniSection(contents) {
      for (const content of contents) {
        if (content.id_content == 0) {
          this.testimoni.judul = content.judul;
          this.testimoni.deskripsi = content.text;
        } else {
          this.testimoni.item.push(content);
        }
      }
    },
  },
};
</script>
