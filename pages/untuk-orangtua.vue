<template>
  <div>
    <Header variant="melengkung" :heroData="header.hero" />
    <div class="section section-keunggulan">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-12 text-center">
            <h2>Pantau kemajuan belajar anak Anda</h2>
          </div>
        </div>
        <div class="row mb-md-5">
          <div class="col-md-12 text-center">
            <div class="row">
              <div class="col-md-6 text-left order-2 order-md-1">
                <h3 class="h5">Lihat Hasil Belajar Anak</h3>
                <p>
                  Lihat langsung perkembangan belajar anak kapan saja, di mana
                  saja.
                </p>
              </div>
              <div class="col-md-6 order-1 order-md-2">
                <img
                  src="/Fitur/fiturortu1.png"
                  class="img-fluid mb-3 mb-md-0"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-center">
            <div class="row">
              <div class="col-md-6">
                <img
                  src="/Fitur/fiturortu2.png"
                  class="img-fluid mb-3 mb-md-0"
                />
              </div>
              <div class="col-md-6 text-left">
                <h3 class="h5">Lihat Aktivitas Belajar anak</h3>
                <p>
                  Melihat akrivitas belajar anak melalui sistem yang
                  terintegrasi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 text-center">
        <h2>Salah Satu Testimoni Orang Tua</h2>
      </div>
      <div class="col-md-12 mt-n5">
        <SectionCardHero
          src="/testimoniortu.png"
          title="Mega ELanda"
          subtitle="Orang tua Rahardian Era - Kelas 12"
          description="“Saya sebagai orang tua merasa senang dan bangga karena anak saya menemukan solusi masalah belajarnya dan akhirnya semangat belajar anak saya semakin tinggi.”"
          href="#"
          cta-text="Masuk Sekarang"
          button
        />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      header: {
        hero: {
          judul: "Solusi Belajar Online",
          subjudul:
            "Solusi pembelajaran digital dapat membantu orang tua memantau kemajuan belajar anak mereka kapan saja, di mana saja.",
          ctaButtonText: "Pantau Perkembangan Anak",
          ctaButtonVariant: "light",
          cataButtonUrl: "#",
          image: "/bannerortu.png",
          isJudulFirst: false,
        },
      },
      keunggulan: {
        judul: "Mengapa harus bergabung dengan Les privat",
        item: [
          {
            gambar: "/icon/tutor1.png",
            judul: "Tentukan Tarif Les Privatmu",
            subjudul:
              "Tentukan sendiri tarifmu tanpa ada komisi yang kami ambil.",
          },
          {
            gambar: "/icon/tutor2.png",
            judul: "Mengajar Kapan Saja & Di Mana Saja",
            subjudul: "Putuskan berapa lama dan berapa jam Anda akan mengajar.",
          },
          {
            gambar: "/icon/tutor3.png",
            judul: "Fasilitas Pengembangan Soft Skill",
            subjudul:
              "Anda akan mendapatkan bantuan yang diperlukan dari tim kami",
          },
        ],
      },
      testimoni: {
        judul: "Apa Kata Mereka Saat Mengajar Di UjiAja?",
        deskripsi: "",
        varian: "secondary",
        item: [
          {
            nama: "Chance Dokidis",
            titel: "Guru Privat di UjiAja",
            testimoni:
              "Menjadi Mitra Pengajar di UjiAja memberikan kesempatan kepada saya untuk turut menjadi saksi dalam membangun peradaban bangsa melalui kemajuan teknologi. Menjadi pribadi yang baik itu suatu kewajiban,  namun menjadi pribadi yang bermanfaat itu adalah keharusan. Maju dan sukses UjiAja",
            foto: "chance.png",
          },
          {
            nama: "Randy Lubin",
            titel: "Guru Privat di UjiAja",
            testimoni:
              "Tiga tahun menjadi Mitra Pengajar di UjiAja memberikan pengalaman yang berharga untuk saya. Selain itu, menyadarkan saya bahwa mengajar adalah seberapa banyak murid memahami materi, bukan seberapa banyak pengajar menyampaikan materi.",
            foto: "randy.png",
          },
        ],
      },
    };
  },
};
</script>