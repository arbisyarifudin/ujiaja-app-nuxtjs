<template>
  <div class="px-3 mx-auto">
    <footer class="section footer mx-auto" id="footer">
      <div class="container">
        <div class="row">
          <div
            class="
              mb-5
              col-lg-3 col-12
              d-flex
              align-items-center
              justify-content-center
              d-lg-block
            "
          >
          <client-only>
            <img v-if="ApiUrl" :src="ApiUrl(footerData.logo)" class="mb-lg-3" style="width: 60px"/>
          </client-only>
            <div class="ml-4 ml-lg-0">
              <h5>Kantor Pusat</h5>
              <p class="mb-0 pb-0">
                {{footerData.alamat_kantor}}
              </p>
            </div>
          </div>
          <div class="mb-3 col-lg-3 col-sm-4 col-6">
            <ul class="list-unstyled">
              <li><h4>Tentang UjiAja</h4></li>
              <li><a class="li" href="/tentang">Tentang UjiAja</a></li>
              <li><a class="li" href="/untuk-tutor">Untuk Tutor</a></li>
              <li><a class="li" href="/untuk-siswa">Untuk Siswa</a></li>
              <li><a class="li" href="/untuk-orangtua">Untuk Orang Tua</a></li>
              <!-- <li><a class="li" href="/karir">Karir</a></li> -->
            </ul>
          </div>
          <div class="mb-3 col-lg-3 col-sm-4 col-6">
            <ul class="list-unstyled">
              <li><h4>Produk UjiAja</h4></li>
              <li><a class="li" href="/produk/tryout-utbk">Tryout UTBK</a></li>
              <!-- <li>
                <a class="li" href="/produk/tryout-asesmen-nasional"
                  >Tryout Asesmen Nasional</a
                >
              </li> -->
              <li><a class="li" href="/produk/tryout-aspd">Tryout ASPD</a></li>
              <li>
                <a class="li" href="/produk/ujian-kenaikan-tingkat-tentor"
                  >Ujian Kenaikan Tingkat Tentor (UKTT)</a
                >
              </li>
              <li><a class="li" href="/produk/les-privat">Les Privat</a></li>
              <li>
                <a class="li" href="/cari-program-studi">Cari Program Studi</a>
              </li>
            </ul>
          </div>
          <div class="mb-3 col-lg-3 col-sm-4 col-12">
            <ul class="list-unstyled">
              <li><h4>Hubungi Kami</h4></li>
              <li>
                <ul class="list-unstyled nav mb-2 flex-wrap">
                  <li v-if="footerData.telp">
                    <a :href="`tel:${footerData.telp}`"
                      ><span class="sosmed"><i class="fas fa-phone"></i></span
                    ></a>
                  </li>
                  <li v-if="footerData.instagram">
                    <a :href="`${footerData.instagram}`"
                      ><span class="sosmed"
                        ><i class="fab fa-instagram"></i></span
                    ></a>
                  </li>
                 <li v-if="footerData.whatsapp">
                    <a :href="`https://wa.me/${footerData.whatsapp}`"
                      ><span class="sosmed"
                        ><i class="fab fa-whatsapp"></i></span
                    ></a>
                  </li>
                  <li v-if="footerData.facebook">
                    <a :href="`${footerData.facebook}`"
                      ><span class="sosmed"
                        ><i class="fab fa-facebook"></i></span
                    ></a>
                  </li>
                  <li v-if="footerData.email">
                    <a :href="`mailto:${footerData.email}`"
                      ><span class="sosmed"
                        ><i class="fas fa-envelope"></i></span
                    ></a>
                  </li>
                </ul>
              </li>
              <li><a class="li" href="/bantuan">FAQ / Bantuan</a></li>
              <li>
                <a class="li" href="/syarat-ketentuan">Syarat dan Ketentuan</a>
              </li>
              <li>
                <a class="li" href="/kebijakan-privasi">Kebijakan Privasi</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>

export default {
  methods: {
    ApiUrl(param) {
      return process.env.apiUrl + "/" + param;
    },
  },
  props: {
    footerData: {
     
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}

</script>
