<template>
  <div>
    <HeaderKarir :navData="navData" />
    <div class="program-studi mb-5 mt-n5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-9 col-md-8">
            <div class="cari karir text-center pt-5 pb-5 mt-n3">
              <h3 class="mt-3">Mengapa Bergabung Dengan Kami?</h3>
              <div class="text-left">
                <p>
                  Masa depan pendidikan bergantung pada dialog berkelanjutan
                  antara pendidik dan lembaga pendidikan, dan profesional di
                  dunia teknologi. EdTech adalah studi dan praktik etis untuk
                  memfasilitasi pembelajaran dan meningkatkan kinerja dengan
                  menciptakan, menggunakan, dan mengelola proses dan sumber daya
                  teknologi yang sesuai. Janji teknologi pendidikan yang
                  berkembang memberikan peluang menarik untuk menerapkan
                  keterampilan Anda dalam lingkungan pendidikan dengan dampak
                  yang benar-benar global. <br /><br />
                  Jika Anda merasa Anda adalah pemain top di beberapa area
                  tetapi tidak dapat menemukan lowongan, silakan kirim resume
                  Anda ke karir@ujiaja.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12 text-center">
          <div class="karir my-4">
            <h2 class="pb-3 m-0">Kesempatan Berkarir</h2>
            <p>Cari tahu bagaimana Anda dapat berkontribusi</p>
          </div>

          <div class="row d-flex justify-content-center">
            <div class="col-md-4">
              <div class="card card-karir">
                <div class="card-body text-left p-0">
                  <div class="card-content px-4">
                    <h3 class="card-judul mt-4 mb-2">
                      Backend Software Engineer
                    </h3>
                    <p class="card-text pb-3">
                      Purna Waktu - WFH, Dimanapun
                      <br />
                      Kisaran Gaji: Rp.4.500.000 - Rp.15.000.000
                    </p>
                    <a href="/karir/1245-graphic-designer" class="karir-link"
                      >Detail <i class="fa fa-chevron-right"></i
                    ></a>
                  </div>
                  <div class="d-flex justify-content-end pb-4 pr-4 m-0 icon">
                    <!-- <img src="assets/img/IconKenapa/kariricon.png" class="" /> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-karir">
                <div class="card-body text-left p-0">
                  <div class="card-content px-4">
                    <h3 class="card-judul my-4">SEO Specialist</h3>
                    <p class="card-text pb-4">
                      Purna Waktu - WFH / WFO <br />Kisaran Gaji: Rp.4.500.000 -
                      Rp.6.500.000
                    </p>
                    <a href="/karir/1245-graphic-designer" class="karir-link"
                      >Detail <i class="fa fa-chevron-right"></i
                    ></a>
                  </div>
                  <div class="d-flex justify-content-end pb-4 pr-4 m-0 icon">
                    <!-- <img src="assets/img/IconKenapa/kariricon2.png" class="" /> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-karir">
                <div class="card-body text-left p-0">
                  <div class="card-content px-4">
                    <h3 class="card-judul my-4">Graphic Designer</h3>
                    <p class="card-text pb-4">
                      Magang - WFH / WFO, Indonesia <br />Gaji: Rp. 2.200.000
                    </p>
                    <a href="/karir/1245-graphic-designer" class="karir-link"
                      >Detail <i class="fa fa-chevron-right"></i
                    ></a>
                  </div>
                  <div class="d-flex justify-content-end pb-4 pr-4 m-0 icon">
                    <!-- <img src="assets/img/IconKenapa/kariricon3.png" class="" /> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            class="btn btn-outline-primary px-4 mt-5 mb-3"
            style="border-radius: 25px"
          >
            Lihat Semua Peluang Karir
          </button>
        </div>
      </div>
      <div
        class="col-lg-12 text-center mb-5 mt-4"
        style="background-color: #f5f3ff"
      >
        <div class="row bg-white shadow-sm">
          <div class="col-md-5 text-right">
            <img src="/karir-bawah.png" alt="" />
          </div>
          <div class="col-md-7 text-left">
            <h3 class="mb-3" style="font-size: 36px">
              Ayo Bergabung di UjiAja!
            </h3>
            <p>Kirim cover letter dan CV kamu ke karir@ujiaja.id</p>
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
      title: 'Karir',
      bodyAttrs: {
        class: "",
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
};
</script>