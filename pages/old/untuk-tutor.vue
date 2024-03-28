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
    <SectionLangkah :props="langkah" />
    <SectionCardHero
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
      title: "Untuk Tutor",
    };
  },
  data() {
    return {
      header: {
        hero: {
          judul: "Bagikan keahlian Anda Bersama UjiAja",
          subjudul:
            "Salurkan hobby dan  keahlian mengajarmu  di UjiAja dan hasilkan uang sesuai lokasi, jadwal, dan tingkat profesionalitasmu!",
          ctaButtonText: "Daftar Sekarang",
          ctaButtonVariant: "secondary",
          cataButtonUrl: "/registrasi",
          image: "/banneruntuktutor_3.png",
          isJudulFirst: false,
        },
      },
      keunggulan: {
        judul: "Mengapa harus bergabung dengan Les privat",
        item: [],
      },
      content3: {},
      langkah: {
        judul: "Langkah Pendaftaran",
        langkah: [],
      },
      testimoni: {
        judul: "Apa Kata Mereka Saat Mengajar Di UjiAja?",
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
      const resContent = await this.$axios.get("/api/cms/tutor/get");
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
      this.header.hero.image = content.gambar;
    },
    setContent2Section(content) {
      for (let i = 0; i < content.length; i++) {
        if (content[i].id_content == 0) {
          this.keunggulan.judul = content[i].judul;
        } else {
          this.keunggulan.item.push(content[i]);
        }
      }
    },
    setContent4Section(contents) {
      for (
        let indexContent = 0;
        indexContent < contents.length;
        indexContent++
      ) {
        this.langkah.langkah.push({
          judul: contents[indexContent].judul,
          deskripsi: contents[indexContent].text,
        });
      }
    },
    setTestimoniSection(contents) {
      for (
        let indexContent = 0;
        indexContent < contents.length;
        indexContent++
      ) {
        if (contents[indexContent].id_content == 0) {
          this.testimoni.judul = contents[indexContent].judul;
          this.testimoni.deskripsi = contents[indexContent].text;
        } else {
          this.testimoni.item.push(contents[indexContent]);
        }
      }
    },
  },
};
</script>
