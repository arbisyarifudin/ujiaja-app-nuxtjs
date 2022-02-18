<template>
  <div>
    <Header :heroData="header.hero" variant="melengkung primary" :navData="navData" />

    <div class="pb-4">
      <div class="container text-center">
        <h2>Detail Tentang UjiAja</h2>
        <p class="text-left">
          UjiAja merupakan Lembaga bimbingan belajar yang sudah mengajar ribuan
          siswa selama 25 tahun Terakhir. UjiAja beralamat di Jl. Sunaryo No.14,
          Kotabaru, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa
          Yogyakarta 55224. Pengalaman 25 tahun ini menjadikan UjiAja pernah
          menjadi pemimpin di industry ini. Perubahan zaman yang kian kemari
          semakin cepat dengan dorongan teknologi, juga mendorong semangat
          UjiAja untuk berbenah menjadi bimbel yang lebih baik dengan bantuan
          teknologi.<br /><br />

          Tak hanya mendigitalkan apa yang sudah ada, namun UjiAja berusaha
          mendobrak pasar baru dengan model bisnis baru sistem tryout dan les
          private yang kali ini dikembangkan. Sistem yang didesain berbasis
          digital ini harapanya mampu menghadirkan solusi yang lebih baik dan
          tepat guna untuk membantu para siswa-siswa di seluruh Indonesia untuk
          uji kemampuan dan minat bakat serta memberikan arahan fokus belajar
          untuk menggapai mimpinya bisa masuk diperguruan tinggi tercinta.<br /><br />

          Selain sistem tryout yang dikembangkan sedimikian rupa, untuk
          mendorong kualitas serta tercapainya mimpi siswa/siswa maka dihadirkan
          pula platform les private yang dapat mempertemukan guru dan siswa
          dalam satu platform sesuai kebutuhan pembelajaran siswa.
        </p>
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
            <h2 class="large py-0 m-0">2019</h2>
            <div class="timeline-rmap" style="height: 65px"></div>
            <p class="small p-0">April</p>
            <div class="timeline-rmap" style="height: 230px"></div>
          </div>
          <div class="col-md-5 col-8 ml-n4 mb-5 align-self-end">
            <div class="text-left sejarah">
              <p style="color: #6560FD; font-weight: 500; font-size: 17px" class="pb-2">Lorem</p>
              <p class="pb-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                sunt repellendus adipisci nostrum reprehenderit dolores iure
                sequi, assumenda delectus quaerat possimus temporibus recusandae
                quam voluptatum atque voluptatibus libero doloremque alias?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima
                rerum aperiam iusto, deleniti enim blanditiis nemo natus ratione
                ducimus voluptatibus omnis. Cumque iure ducimus pariatur dicta
                doloremque voluptas minima ex.
              </p>
            </div>
          </div>

          <div class="col-md-5 col-8 mr-n4 mb-5 align-self-end">
            <div class="text-left sejarah-kiri">
              <p style="color: #6560FD; font-weight: 500; font-size: 17px" class="pb-2">Lorem</p>
              <p class="pb-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                sunt repellendus adipisci nostrum reprehenderit dolores iure
                sequi, assumenda delectus quaerat possimus temporibus recusandae
                quam voluptatum atque voluptatibus libero doloremque alias?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima
                rerum aperiam iusto, deleniti enim blanditiis nemo natus ratione
                ducimus voluptatibus omnis. Cumque iure ducimus pariatur dicta
                doloremque voluptas minima ex.
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
            <h2 class="large py-0 m-0">2020</h2>
            <div class="timeline-rmap" style="height: 65px"></div>
            <p class="small p-0">Agustus</p>
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
            <p class="small p-0">Januari</p>
            <div class="timeline-rmap" style="height: 200px"></div>
            <div class="circle-rmap mt-n3 mx-auto"></div>
          </div>
          <div class="col-md-5 col-8 ml-n4 mb-4 align-self-end">
            <div class="text-left sejarah">
              <p style="color: #6560FD; font-weight: 500; font-size: 17px" class="pb-2">Lorem</p>
              <p class="pb-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                sunt repellendus adipisci nostrum reprehenderit dolores iure
                sequi, assumenda delectus quaerat possimus temporibus recusandae
                quam voluptatum atque voluptatibus libero doloremque alias?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima
                rerum aperiam iusto, deleniti enim blanditiis nemo natus ratione
                ducimus voluptatibus omnis. Cumque iure ducimus pariatur dicta
                doloremque voluptas minima ex.
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
          Tujuan dari dibuatnya sistem les private adalah untuk membantu
          siswa-siswi melihat kemampuan nya serta mempersiapkan diri untuk masuk
          ke jenjang yang lebih tinggi melalui rekomendasi belajar yang
          diberikan. Dan untuk sistem les private dibuat dengan tujuan
          memfasilitasi siswa/siswi untuk belajar pada guru terbaik dimanapun
          dan kapanpun.
        </p>

        <div class="visimisi">
          <div class="row">
            <div class="col-md-6 text-left">
              <div class="visi">
                <i class="fa fa-bullseye fa-5x"></i>
                <h3>Visi Kami</h3>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Distinctio officiis sint rerum ad.
                </p>
              </div>
            </div>
            <div class="col-md-6 text-left">
              <div class="misi">
                <i class="fa fa-rocket fa-5x"></i>
                <h3>Misi Kami</h3>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Distinctio officiis sint rerum ad.
                </p>
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
            "Media pembelajaran berbasis teknologi yang fokus pada kemampuan menjawab soal sehingga kamu bisa lebih mempersiapkan diri menghadapi ujian. ",
          judul: "Tentang UjiAja",
          ctaButtonText: null,
          image: "/banner-tentang.png",
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
  methods: {
    ApiUrl(param) {
      return process.env.apiUrl + "/" + param;
    }
  }
};
</script>