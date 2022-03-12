<template>
  <div class="section fitur-layanan">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2 style="text-align: center">Fitur dan Layanan UjiAja</h2>
          <p style="text-align: center">
            Cukup 1 kali bayar kamu akan mendapatkan seluruh fitur dan layanan
            berikut.
          </p>
          <div class="row">
            <div class="col-lg-9 col-md-12">
              <div class="row">
                <div class="col-md-4 mb-4">
                  <CardGrad :lg="'top-bottom'" class="fitur">
                    <div class="text-center">
                      <img src="/fitur/fitur1.png" class="mb-4 img-fluid" />
                    </div>
                    <h4>Ribuan Soal Bagi Tutor</h4>
                    <p class="fitur-text">
                      Ribuan soal dan pembahasan yang dapat digunakan oleh guru
                    </p>
                    <a href="/app" class="readmore">Selengkapnya</a>
                  </CardGrad>
                </div>
                <div class="col-md-8 mb-4">
                  <CardGrad :lg="'right-left'" class="fitur">
                    <div class="row">
                      <div class="col-md-6 pt-5 order-md-1 order-2">
                        <h4>Tryout UTBK</h4>
                        <p class="fitur-text">
                          Tersedia ratusan paket Try Out yang bisa di akses
                          kapan saja dan dimana saja
                        </p>
                        <a href="/app/tryout" class="readmore">Selengkapnya</a>
                      </div>
                      <div class="col-md-6 text-center order-md-2 order-1">
                        <img src="/fitur/fitur2.png" class="img-fluid h-100" />
                      </div>
                    </div>
                  </CardGrad>
                </div>
              </div>
              <div class="row">
                <div class="col-md-8 mb-4">
                  <CardGrad :lg="'right-left'" class="fitur">
                    <div class="row">
                      <div class="col-md-6 pt-5 order-md-1 order-2">
                        <h4>Diskusi Dengan Tutor</h4>
                        <p class="fitur-text">
                          Pengajar kami senantiasa menunggu pertanyaan mu setiap
                          harinya
                        </p>
                        <a href="/app" class="readmore">Selengkapnya</a>
                      </div>
                      <div class="col-md-6 text-center order-md-2 order-1">
                        <img src="/fitur/fitur4.png" class="img-fluid h-100" />
                      </div>
                    </div>
                  </CardGrad>
                </div>
                <div class="col-md-4 mb-4">
                  <CardGrad :lg="'top-bottom'" class="fitur">
                    <div class="text-center">
                      <img src="/fitur/fitur5.png" class="mb-4 img-fluid" />
                    </div>
                    <h4>Event Tryout Akbar</h4>
                    <p class="fitur-text">
                      Akses dan ikuti event Tryout Nasional setiap bulannya
                    </p>
                    <a href="/app/tryout" class="readmore">Selengkapnya</a>
                  </CardGrad>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-12 mb-4">
              <CardGrad :lg="'top-bottom'" class="fitur">
                <div class="text-center">
                  <img
                    src="/fitur/fitur3.png"
                    class="mb-3 pl-lg-3 pt-5 mt-2 img-fluid"
                  />
                </div>
                <h4>Pantau Perkembangan Belajar Anak</h4>
                <p class="fitur-text">
                  Orang tua dapat memantau perkembangan belajar anak dengan data
                  statistik hasil ujian.
                </p>
                <a href="/app" class="readmore text-left">Selengkapnya</a>
              </CardGrad>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 mb-4">
              <CardGrad :lg="'right-left'" class="fitur">
                <div class="row align-items-center">
                  <div class="col-md-6 pt-5 order-md-1 order-2">
                    <h4>Cari Jurusan</h4>
                    <p class="fitur-text">
                     Cari jurusan yang kamu minati secara lengkap di Ujiaja.
                    </p>
                    <a href="/cari-program-studi" class="readmore">Selengkapnya</a>
                  </div>
                  <div class="col-md-6 text-center order-md-2 order-1">
                    <img src="/fitur/fitur1.png" class="img-fluid" style="height: 68%"/>
                  </div>
                </div>
              </CardGrad>
            </div>
            <div class="col-md-6 mb-4">
              <CardGrad :lg="'top-bottom'" class="fitur">
                <div class="text-center">
                  <img src="/fitur/fitur6.png" class="mb-4 img-fluid" />
                </div>
                <h4>Tryout ASPD</h4>
                <p class="fitur-text">
                  Soal yang tersedia sesuai dengan TPM DIY
                </p>
                <a href="/app/tryout" class="readmore">Selengkapnya</a>
              </CardGrad>
            </div>
            <!-- <div class="col-md-6 mb-4">
              <CardGrad :lg="'left-right'" class="fitur">
                <div class="row">
                  <div class="col-md-6 text-center">
                    <img src="/fitur/fitur7.png" class="mt-3 img-fluid h-100" />
                  </div>
                  <div class="col-md-6 pt-5">
                    <h4>Tryout Asesmen Nasional</h4>
                    <p class="fitur-text pb-5">
                      Soal yang tersedia sesuai dengan desain pengembangan soal
                      AKM PUSMENJAR
                    </p>
                    <a href="" class="readmore">Selengkapnya</a>
                  </div>
                </div>
              </CardGrad>
            </div> -->
            <div class="col-md-6 mb-4">
              <CardGrad :lg="'top-bottom'" class="fitur">
                <div class="text-center">
                  <img src="/fitur/fitur8.png" class="pb-3 ml-2 img-fluid" />
                </div>
                <h4>Tes Minat, Bakat & Potensi</h4>
                <p class="fitur-text">
                  Siswa dapat menggali potensi diri lebih dalam dengan tes ini
                </p>
                <a href="app/mbti" class="readmore">Selengkapnya</a>
              </CardGrad>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
