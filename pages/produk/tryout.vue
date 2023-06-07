<template>
  <div>
    <Header variant="melengkung" :heroData="header.hero" :navData="navData" />
    <SectionKeunggulan :props="keunggulan" />
    <SectionProduk :props="produk" />
    <SectionCardHero
      :src="formatImageSource(content4.gambar)"
      :title="content4.judul"
      :description="content4.text"
      :href="content4.link"
      :cta-text="content4.tombol"
      button
    />
    <SectionTestimoni :props="testimoni" />
    <SectionCardHero
      src="/hero-lagi-person3.png"
      title="Temukan keseruan latihan dan uji Tryout pilihanmu hanya di UjiAja"
      description="Persiapkan materi ujianmu selengkap mungkin sesuai kebutuhanmu."
      href="/registrasi"
      cta-text="Daftar Sekarang"
      button
    />
    <Footer :footerData="footerData" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Tryout",
    };
  },
  data() {
    return {
      header: {
        hero: {
          judul: "Siap Lolos Sekolah & PTN Impian Bareng UjiAja!",
          subjudul:
            "Gunakan Platform Tryout Terbaik untuk Tingkatkan Kesiapanmu, serta menangkan Seleksi Ujian Masuk Jenjang SMP, SMA dan Perguruan Tinggi Negeri Idamanmu!",
          ctaButtonText: "Daftar Sekarang",
          ctaButtonVariant: "secondary",
          cataButtonUrl: "/registrasi",
          image: "/hero-tryout_3.png",
          isJudulFirst: false,
        },
      },
      keunggulan: {
        judul: "Mengapa Kamu harus mencoba tryout di UjiAja?",
        item: [],
      },
      produk: {
        judul: "Ada berapa jenis tryout yang ada di UjiAja?",
        deskripsi:
          "UjiAja menyediakan semua amunisi yang kamu butuhkan untuk menuju kampus impianmu!<br /> Belajar efektif dengan rangkuman lengkap serta ratusan soal yang variatif dan menantang.",
        item: [],
      },
      gambarProduk: [
        "/produk/tryout1.png",
        "/produk/tryout2.png",
        "/produk/tryout3.png",
        "/produk/tryout4.jpg",
      ],
      content4: {},
      testimoni: {
        judul: "Ratusan alumni UjiAja Berhasil mewujudkan kampus impian",
        deskripsi: "",
        // varian: 'secondary',
        item: [
          {
            nama: "Carla Mango",
            titel: "Kedokteran - Universitas Negeri Semarang",
            testimoni:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing odio id condimentum nisl. Vulputate consequat purus amet facilisis est, lectus non urna morbi. Cursus posuere donec congue velit vitae sit massa purus. Adipiscing at euismod morbi nisl, sit et risus. Eget aliquam lacus vel turpis tellus sed nulla.",
            foto: "/carla.png",
          },
          {
            nama: "Wilson Aminoff",
            titel: "Ilmu Komputer - Universitas Gajah Mada",
            testimoni:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames sed nam eget aenean ultrices proin metus. Ut risus, sed dictumst viverra. Faucibus sed fermentum in eros mi in tellus. Varius consequat, amet ut nulla massa rhoncus. Nibh in adipiscing.",
            foto: "/wilson.png",
          },
        ],
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
  created() {
    // console.log(this.$store.getters['checkIsAuth'])
    if (this.$store.getters["checkIsAuth"]) {
      this.header.hero.ctaButtonText = "Pergi ke Dashboard";
      this.header.hero.cataButtonUrl = "/app/dashboard";
    }
  },
  async fetch() {
    try {
      const resContent = await this.$axios.get("/api/cms/tryout/get");
      const res = resContent.data;
      console.log(res.data);
      if (resContent.data.success) {
        this.setHeroSection(res.data.dataContent1[0]);
        this.keunggulan.item = res.data.dataContent2;
        this.setContent3Section(res.data.dataContent3);
        this.content4 = res.data.dataContent5[0];
        // this.konten5 = res.data.dataContent5.length == 0 ? {} : res.data.dataContent5[0];
        // this.tryOut = res.data.dataContent6.length == 0 ? {} : res.data.dataContent6[0];
        // this.programStudi = res.data.dataContent7.length == 0 ? {} : res.data.dataContent7[0];
        // this.setTestimoniSection(res.data.dataContent8);
        // this.konten9 = res.data.dataContent9.length == 0 ? {} : res.data.dataContent9[0];
      }
    } catch (error) {
      console.error(error);
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
    setContent3Section(contents) {
      for (let indexContent = 0; indexContent < contents.length; indexContent++) {
        if (contents[indexContent].id_content == 0) {
          this.produk.judul = contents[indexContent].judul;
          this.produk.deskripsi = contents[indexContent].text;
        } else {
          this.produk.item.push(contents[indexContent]);
        }
      }

      for (let indexItem = 0; indexItem < this.produk.item.length; indexItem++) {
        this.produk.item[indexItem].gambar = this.gambarProduk[indexItem];
      }
    },
  },
};
</script>
