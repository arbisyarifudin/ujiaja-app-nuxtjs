<template>
  <div>
    <Header :heroData="header.hero" variant="melengkung primary" :navData="navData" />

    <div class="pb-4">
      <div class="container text-center">
        <h2>{{ content2.judul }}</h2>
        <span class="text-left" v-html="content2.text" />
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 wrap-rmap text-center pt-5">
        <div class="d-flex rmap-header align-items-center justify-content-center mb-3">
          <!-- <img src="/logo1.png" class="img-fluid" style="width: 50px" /> -->
          <img :src="ApiUrl(navData.logo)" class="img-fluid" style="width: 90px" />
        </div>
        <h2 class="py-3 mb-4">Perjalanan Sejarah UjiAja</h2>
        <div
          class="row align-flex-star justify-content-center"
          v-for="(ctn, indexCtn) in content3"
          :key="indexCtn"
        >
          <div class="col-md-5 col-8 ml-n4 mb-5 align-self-end">
            <div class="text-left sejarah" v-if="ctn.posisi == 'kiri'">
              <p style="color: #6560fd; font-weight: 500; font-size: 17px" class="pb-2">
                {{ ctn.judul }}
              </p>
              <p class="pb-0" v-html="ctn.text" />
            </div>
          </div>
          <div
            class="col-md-1 col-3 rmap-item d-flex-important flex-direction-column align-items-center"
          >
            <div class="circle-rmap mx-auto"></div>
            <div class="timeline-rmap" style="height: 35px"></div>
            <h2 class="large py-0 m-0">{{ ctn.tahun }}</h2>
            <div class="timeline-rmap" style="height: 65px"></div>
            <p class="small p-0">{{ ctn.bulan }}</p>
            <div class="timeline-rmap" style="height: 230px"></div>
          </div>
          <div class="col-md-5 col-8 ml-n4 mb-5 align-self-end">
            <div class="text-left sejarah" v-if="ctn.posisi == 'kanan'">
              <p style="color: #6560fd; font-weight: 500; font-size: 17px" class="pb-2">
                {{ ctn.judul }}
              </p>
              <p class="pb-0" v-html="ctn.text" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 tujuan text-center">
        <h2>{{ content4.judul }}</h2>
        <p class="text-left" v-html="content4.text" />

        <div class="visimisi">
          <div class="row">
            <div class="col-md-6 text-left">
              <div class="visi">
                <img
                  :src="formatImageSource(content4.item[0].gambar)"
                  class="img-fluid"
                  style="width: 130px"
                />
                <h3>{{ content4.item[0].judul }}</h3>
                <p v-html="content4.item[0].text" />
              </div>
            </div>
            <div class="col-md-6 text-left">
              <div class="misi">
                <img
                  :src="formatImageSource(content4.item[1].gambar)"
                  class="img-fluid"
                  style="width: 130px"
                />
                <h3>{{ content4.item[1].judul }}</h3>
                <p v-html="content4.item[1].text" />
              </div>
            </div>
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
      title: "Tentang",
    };
  },
  data() {
    return {
      header: {
        hero: {
          subjudul:
            "Media  belajar berbasis teknologi buat kamu-kamu dapetin metode dan partner belajar asyik guna ngadepin ujian sekolah,  seleksi sekolah lanjut  dan masuk perguruan tinggi favoritmu.",
          judul: "Tentang UjiAja",
          ctaButtonText: null,
          image: "/tentang.png",
          isJudulFirst: false,
        },
      },
      content2: {
        judul: "",
        text: "",
      },
      content3: [
        {
          judul: "",
          text: "",
          tahun: "",
          bulan: "",
          posisi: "",
        },
      ],
      content4: {
        judul: "",
        text: "",
        item: [
          {
            gambar: "",
            judul: "",
            text: "",
          },
          {
            gambar: "",
            judul: "",
            text: "",
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
  async fetch() {
    try {
      const resContent = await this.$axios.get("/api/cms/tentang-ujiaja/get");
      const res = resContent.data;
      console.log(res.data);
      if (resContent.data.success) {
        this.setHeroSection(res.data.dataContent1[0]);
        this.content2.judul = res.data.dataContent2[0].judul;
        this.content2.text = res.data.dataContent2[0].text;
        this.setContent3Section(res.data.dataContent3);
        this.setContent4Section(res.data.dataContent4);
      }
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    formatImageSource(endpoint) {
      return process.env.apiUrl + `/storage/${endpoint}`;
    },
    ApiUrl(param) {
      return process.env.apiUrl + "/" + param;
    },
    setHeroSection(content) {
      this.header.hero.judul = content.judul;
      this.header.hero.subjudul = content.text;
      this.header.hero.image = content.gambar;
    },
    setContent4Section(contents) {
      this.content4.item = [];
      for (let indexCtn = 0; indexCtn < contents.length; indexCtn++) {
        if (contents[indexCtn].id_content == 0) {
          this.content4.judul = contents[indexCtn].judul;
          this.content4.text = contents[indexCtn].text;
        } else {
          this.content4.item.push(contents[indexCtn]);
        }
      }
    },
    setContent3Section(contents) {
      this.content3 = [];
      for (let indexCtn = 0; indexCtn < contents.length; indexCtn++) {
        const judul = JSON.parse(contents[indexCtn].judul)[0].judul1;
        const text = JSON.parse(contents[indexCtn].text)[0].text1;
        const tahun = JSON.parse(contents[indexCtn].tahun)[0].tahun1;
        const bulan = JSON.parse(contents[indexCtn].bulan)[0].bulan1;
        const posisi = JSON.parse(contents[indexCtn].posisi)[0].posisi1;

        this.content3.push({
          judul: judul,
          text: text,
          tahun: tahun,
          bulan: bulan,
          posisi: posisi,
        });
      }
    },
  },
};
</script>
