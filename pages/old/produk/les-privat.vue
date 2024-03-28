<template>
  <div>
    <Header variant="melengkung primary" :heroData="header.hero" :navData="navData" />
    <SectionKeunggulan :props="keunggulan" variant="bg-transparent" />
    <SectionLangkah :props="langkah" />
    <SectionCardHero
      :src="formatImageSource(content4.gambar)"
      :title="content4.judul"
      :description="content4.text"
      :href="content4.link"
      :cta-text="content4.tombol"
      button
    />

    <SectionPertanyaan :items="pertanyaan" :footerData="footerData" />

    <Footer />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Les Privat",
    };
  },
  data() {
    return {
      header: {
        hero: {
          judul: "Temukan Guru Les Privat yang Tepat Untukmu",
          subjudul:
            "Tentukan pilihanmu, mau online ataupun tatap muka dengan ratusa guru terbaik dari UjiAja.",
          ctaButtonText: "Temukan Sekarang",
          ctaButtonVariant: "primary",
          cataButtonUrl: "/registrasi",
          image: "/lesprivat_3.png",
          isJudulFirst: false,
        },
      },
      keunggulan: {
        judul: "Mengapa Kamu harus mencoba Temukan Guru Les Privat?",
        item: [],
      },
      langkah: {
        judul: "Cara Temukan Guru Les Privat",
        langkah: [],
      },
      content4: {
        judul: "",
        text: "",
        tombol: "",
        link: "",
        gambar: "",
      },
      pertanyaan: [
        {
          q: "Dimana Les Privat dilaksanakan?",
          a: `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.`,
        },
        {
          q: "Bagaimana Les Privat dilaksanakan selama masa pandemi covid 19?",
          a: `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.`,
        },
        {
          q: "Apakah saya akan dapat modul pembelajaran?",
          a: `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.`,
        },
        {
          q: "Bagaimana cara mendaftar sebagai siswa?",
          a: `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.`,
        },
        {
          q: "Apakah guru les privat terkualifikasi & berkualitas?",
          a: `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.`,
        },
      ],
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
      const resContent = await this.$axios.get("/api/cms/les-privat/get");
      const res = resContent.data;
      console.log(res.data);
      if (resContent.data.success) {
        this.setHeroSection(res.data.dataContent1[0]);
        this.keunggulan.item = res.data.dataContent2;
        this.setContent3Section(res.data.dataContent3);
        this.content4 = res.data.dataContent4[0];
        // this.setTestimoniSection(res.data.dataContent8);
        // this.content6 = res.data.dataContent9[0];
      }
    } catch (error) {
      console.error(error);
    }
  },
  created() {
    // console.log(this.$store.getters['checkIsAuth'])
    if (this.$store.getters["checkIsAuth"]) {
      this.header.hero.cataButtonUrl = "/user/student/courses";
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
        this.langkah.langkah.push({
          judul: contents[indexContent].judul,
          deskripsi: contents[indexContent].text,
        });
      }
    },
  },
};
</script>
