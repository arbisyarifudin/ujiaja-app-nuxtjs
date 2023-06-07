<template>
  <div>
    <Header :heroData="header.hero" variant="melengkung primary" :navData="navData" />

    <div class="pb-4">
      <div class="container text-center">
        <h2>Detail Tentang UjiAja</h2>
        <p class="text-left">
          UjiAja merupakan produk dari Lembaga Bimbingan Belajar yang sudah mengajar ratusan ribu siswa selama 25 tahun terakhir. Beralamat di Jalan Ipda Tut Harsono 12 Kota Yogyakarta dan menempati Gedung Utama Timoho Block, UjiAja memiliki pengalaman panjang yang pernah menempatkannya  sebagai pemain papan atas dalam industri konseling dan bimbingan belajar. Adanya perubahan zaman dengan perkembangan teknologi yang semakin cepat  mendorong semangat UjiAja untuk berbenah menjadi bimbel berbasis neoteknologi yang lebih baik lagi. </p>

          <p  class="text-left">Tak hanya mendigitalkan apa yang sudah ada, namun UjiAja berusaha
          mendobrak pasar baru dengan model bisnis baru sistem tryout dan les
          private yang kali ini dikembangkan. Sistem yang didesain berbasis
          digital ini harapanya mampu menghadirkan solusi yang lebih baik dan
          tepat guna untuk membantu para siswa-siswa di seluruh Indonesia untuk
          uji kemampuan dan minat bakat serta memberikan arahan fokus belajar
          untuk menggapai mimpinya bisa masuk diperguruan tinggi tercinta.</p>

          <p  class="text-left">Selain pengembangan sistem tryout, guna  mendorong kualitas serta tercapainya mimpi siswa/siswi maka dihadirkan pula platform les private yang dapat mempertemukan guru dan siswa dalam satu platform sesuai kebutuhan pembelajaran siswa.</p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 wrap-rmap text-center pt-5">
        <div
          class="
            d-flex
            rmap-header
            align-items-center
            justify-content-center
            mb-3
          "
        >
          <!-- <img src="/logo1.png" class="img-fluid" style="width: 50px" /> -->
          <img :src="ApiUrl(navData.logo)" class="img-fluid" style="width: 90px" />
        </div>
        <h2 class="py-3 mb-4">Perjalanan Sejarah UjiAja</h2>
        <div class="row align-flex-star justify-content-center">
          <div
            class="col-md-5 col rmap pb-4 d-flex justify-content-center"
          ></div>
          <div
            class="
              col-md-1 col-3
              rmap-item
              d-flex-important
              flex-direction-column
              align-items-center
            "
          >
            <div class="circle-rmap mx-auto"></div>
            <div class="timeline-rmap" style="height: 35px"></div>
            <h2 class="large py-0 m-0">2020</h2>
            <div class="timeline-rmap" style="height: 65px"></div>
            <p class="small p-0">Oktober</p>
            <div class="timeline-rmap" style="height: 230px"></div>
          </div>
          <div class="col-md-5 col-8 ml-n4 mb-5 align-self-end">
            <div class="text-left sejarah">
              <p style="color: #6560FD; font-weight: 500; font-size: 17px" class="pb-2">Audit dan Evaluasi Strategik Perkembangan Bisnis UjiAja</p>
              <p class="pb-0">
                Dipengaruhi oleh mewabahnya virus corona (covid-19) yang menyebabkan adanya perubahan model belajar dari proses belajar di sekolah menjadi di rumah, dan kebutuhan penyesuaian pola belajar sejalan dengan percepatan perkembangan teknologi.
              </p>
            </div>
          </div>

          <div class="col-md-5 col-8 mr-n4 mb-5 align-self-end">
            <div class="text-left sejarah-kiri">
              <p style="color: #6560FD; font-weight: 500; font-size: 17px" class="pb-2">Rencana Pengembangan Bisnis Baru UjiAja</p>
              <p class="pb-0">
                Ditetapkan sebuah perencanaan tentang pengembangan bisnis baru UjiAja, dengan fokus dan arah kebijakan pada terciptanya layanan konseling dan bimbingan belajar berbasis neo teknologi, melalui pembuatan Platform Media Belajar UjiAja.
              </p>
            </div>
          </div>
          <div
            class="
              col-md-1 col-3
              rmap-item
              d-flex-important
              flex-direction-column
              align-items-center
              mr-n5
            "
          >
            <h2 class="large py-0 m-0">2021</h2>
            <div class="timeline-rmap" style="height: 65px"></div>
            <p class="small p-0">Januari</p>
            <div class="timeline-rmap" style="height: 230px"></div>
          </div>
          <div class="col-md-5 col rmap d-flex justify-content-center"></div>

          <div class="col-md-5 col rmap d-flex justify-content-center"></div>
          <div
            class="
              col-md-1 col-3
              rmap-item
              d-flex-important
              flex-direction-column
              align-items-center
            "
          >
            <h2 class="large py-0 m-0">2021</h2>
            <div class="timeline-rmap" style="height: 65px"></div>
            <p class="small p-0">April</p>
            <div class="timeline-rmap" style="height: 200px"></div>
          </div>
          <div class="col-md-5 col-8 ml-n4 mb-4 align-self-end">
            <div class="text-left sejarah">
              <p style="color: #6560FD; font-weight: 500; font-size: 17px" class="pb-2">Implementasi Program Pengembangan Platform UjiAja</p>
              <p class="pb-0">
               Dimulai pembuatan Platform UjiAja dengan menunjuk salah satu penyedia jasa pembuatan platform teknologi informasi.
              </p>
            </div>
          </div>

          <div class="col-md-5 col-8 mr-n4 mb-5 align-self-end">
            <div class="text-left sejarah-kiri">
              <p style="color: #6560FD; font-weight: 500; font-size: 17px" class="pb-2">Uji Coba Sistem Platform UjiAja</p>
              <p class="pb-0">
                Dilakukan uji coba kepada siswa-siswi calon pengguna dan mitra untuk memperoleh umpan balik dari sistem try out yang dihadirkan. Ujicoba diikuti oleh lebih dari 500 orang peserta yang terdiri dari siswa-siswi Sekolah Dasar, Sekolah Menengah Pertama, dan Sekolah Menengah Atas. Hasil dari ujicoba ini diperoleh masukan antara lain  penambahan dan perbaikan beberapa fitur, terutama yang terkait dengan User Experience (UX).
              </p>
            </div>
          </div>
          <div
            class="
              col-md-1 col-3
              rmap-item
              d-flex-important
              flex-direction-column
              align-items-center
              mr-n5
            "
          >
            <h2 class="large py-0 m-0">2022</h2>
            <div class="timeline-rmap" style="height: 65px"></div>
            <p class="small p-0">Februari</p>
            <div class="timeline-rmap" style="height: 230px"></div>
          </div>
          <div class="col-md-5 col rmap d-flex justify-content-center"></div>

          <div class="col-md-5 col rmap d-flex justify-content-center"></div>

          <div class="col-md-5 col rmap d-flex justify-content-center"></div>

          <div class="col-md-5 col rmap d-flex justify-content-center"></div>
          <div
            class="
              col-md-1 col-3
              rmap-item
              d-flex-important
              flex-direction-column
              align-items-center
            "
          >
            <h2 class="large py-0 m-0">2022</h2>
            <div class="timeline-rmap" style="height: 65px"></div>
            <p class="small p-0">April</p>
            <div class="timeline-rmap" style="height: 200px"></div>
             <div class="circle-rmap mt-n3 mx-auto"></div>
          </div>
          <div class="col-md-5 col-8 ml-n4 mb-4 align-self-end">
            <div class="text-left sejarah">
              <p style="color: #6560FD; font-weight: 500; font-size: 17px" class="pb-2">Launching Produk UjiAja </p>
              <p class="pb-0">
               Platform UjiAja sebagai sebagai sebuah model bisnis baru yang memberikan layanan TryOut dan Les Privat mulai diperkenalkan dan ditawarkan kepada masyarakat umum.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 tujuan text-center">
        <h2>Tujuan UjiAja</h2>
        <p class="text-left">
          Tujuan dari dibuatnya sistem TryOut adalah untuk membantu siswa-siswi melihat minat, bakat dan kemampuannya, serta mempersiapkan diri untuk masuk ke jenjang yang lebih tinggi melalui rekomendasi belajar yang diberikan. Dan untuk sistem les private dibuat dengan tujuan memfasilitasi siswa/siswi untuk belajar pada guru terbaik dimanapun dan kapanpun.
        </p>
        
        <div class="visimisi">
          <div class="row">
            <div class="col-md-6 text-left">
              <div class="visi">
                <i class="fa fa-bullseye fa-5x"></i>
                <h3>Visi Kami</h3>
                <p>
                  Menjadi Penyedia Layanan Konsultasi dan Bimbingan Belajar Berbasis Neo Teknologi yang Unggul dan Terpercaya.
                </p>
              </div>
            </div>
            <div class="col-md-6 text-left">
              <div class="misi">
                <i class="fa fa-rocket fa-5x"></i>
                <h3>Misi Kami</h3>
                <ol>
                  <li>Menyelenggarakan layanan TryOut untuk tes studi lanjut dan Les Privat yang profesional dan terpercaya.</li>
                  <li>Mencetak dan menghadirkan sumber daya tutor yang profesional, handal, dan terpercaya dengan konsep kemitraan yang jujur, amanah, dan saling menguntungkan.</li>
                  <li>Menciptakan hubungan dan komunikasi yang harmonis dengan berbagai pihak, terutama mitra tutor, siswa dan orangtua siswa pengguna platform.</li>
                  <li>Menyelenggarakan riset dan pengembangan (R&D) produk dan layanan guna perbaikan/ penyempurnaan yang terus-menerus.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer :footerData="footerData"/>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Tentang',
    }
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
    };
  },
  asyncData(context) {
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
      navData,
      footerData
    }
  },
  async fetch() {
    try {
      const resContent = await this.$axios.get("/api/cms/tentang-ujiaja/get");
      const res = resContent.data;
      console.log(res.data);
      if (resContent.data.success) {
        this.setHeroSection(res.data.dataContent1[0]);
        // this.keunggulan.item = res.data.dataContent2;
        // this.setContent3Section(res.data.dataContent3);
        // this.content4 = res.data.dataContent5[0];
        // this.setTestimoniSection(res.data.dataContent8);
        // this.content6 = res.data.dataContent9[0];
      }
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    ApiUrl(param) {
      return process.env.apiUrl + "/" + param;
    },
    setHeroSection(content) {
      this.header.hero.judul = content.judul;
      this.header.hero.subjudul = content.text;
      this.header.hero.image = content.gambar;
    },
  }
};
</script>
