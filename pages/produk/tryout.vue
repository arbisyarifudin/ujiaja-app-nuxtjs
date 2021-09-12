<template>
  <div>
    <Header variant="melengkung primary" :heroData="header.hero" />
    <SectionKeunggulan :props="keunggulan" variant="bg-transparent" />
    <SectionProduk :props="produk" />
    <SectionCardHero
      src="/eneng3.png"
      title="Maksimalkan Peluang Lolos Tryout Bersama UjiAja"
      description="Cobalah tryout UTBK, Asesmen Nasional, dan ASPD agar persiapanmu semakin matang sebelum ujian yang sesungguhnya dimula."
      href="#"
      cta-text="Daftar Sekarang"
      button
    />
    <SectionTestimoni :props="testimoni" />
    <SectionCardHero
      src="/bambang.png"
      title="Temukan keseruan latihan dan uji Tryout Pilihanmu hanya di UjiAja"
      description="Persiapkan materi ujianmu selengkap mungkin sesuai kebutuhanmu."
      href="#"
      cta-text="Daftar Sekarang"
      button
    />
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      header: {
        hero: {
          judul: "Siap Lolos Sekolah & PTN Impian Bareng UjiAja!",
          subjudul:
            "Gunakan Platform Tryout Terbaik Untuk Tingkatkan Kesiapanmu. Hadapi Masuk Jenjang SMP, SMA dan Perguruan Tinggi negeri!",
          ctaButtonText: "Daftar Sekarang",
          ctaButtonVariant: "light",
          cataButtonUrl: "#",
          image: "/hero-tryout.png",
          isJudulFirst: false,
        },
      },
      keunggulan: {
        judul: "Mengapa Kamu harus mencoba tryout di UjiAja?",
        item: [
          {
            gambar: "/icon/icon-tryout.png",
            judul: "Soal Prediksi Yang Akurat",
            subjudul: "Soal prediksi tryout yang akurat disertai pembahasan",
          },
          {
            gambar: "/icon/icon-tryout2.png",
            judul: "Penilaian sama dengan UTBK, AN, & ASPD",
            subjudul:
              "Penilaian Tryout di UjiAja mirip dengan penilaian UTBK, Asesmen Nasional, & ASPD",
          },
          {
            gambar: "/icon/icon-tryout3.png",
            judul: "Pemeringkatan secara Nasional",
            subjudul: "Dilakukan pemeringkatan dan pemetaan secara nasional",
          },
        ],
      },
      produk: {
        judul: "Ada berapa jenis tryout yang ada di UjiAja?",
        deskripsi:
          "UjiAja menyediakan semua amunisi yang kamu butuhkan untuk menuju kampus impianmu!<br /> Belajar efektif dengan rangkuman lengkap serta ratusan soal yang variatif dan menantang.",
        item: [
          {
            gambar: "/produk/tryout1.png",
            judul: 'Tryout <span class="large">UTBK</span>',
            brand: "by UjiAja",
            deskripsi:
              "Persiapkan dirimu hadapi ujian UTBK dengan latihan Tryout yang akurat, lengkap dengan fitur terbaik.",
            tambahan: "Gratis Tes Minat, Bakat & Potensi",
            url: "/produk/tryout",
          },
          {
            gambar: "/produk/tryout2.png",
            judul: 'Tryout <span class="large">Asesmen Nasional</span>',
            brand: "by UjiAja",
            deskripsi:
              "Persiapkan dirimu hadapi ujian Asesmen Kompetensi Minimum (Literasi & Numerasi) dengan latihan Tryout AKM yang akurat. Tryout ini ditujukan untuk jenjang SD hingga SMA.",
            tambahan: null,
            url: "/produk/tryout",
          },
          {
            gambar: "/produk/tryout3.png",
            judul: 'Tryout <span class="large">ASPD</span>',
            brand: "by UjiAja",
            deskripsi:
              "Persiapkan dirimu hadapi ujian Asesmen Standar Pendidikan Daerah (Khusus DIY) dengan latihan Tryout ASPD yang akurat. Tryout ini ditujukan untuk jenjang SD hingga SMA.",
            tambahan: null,
            url: "/produk/tryout",
          },
          {
            gambar: "/produk/tryout4.jpg",
            judul: 'MB<span class="large">TI</span>',
            brand: "by UjiAja",
            deskripsi:
              "Persiapkan kuliah, dan potensimu dengan pilihan yang tepat sesuai minat dan bakat dengan ikut MBTI. MBTI ini ditujukan untuk jenjang SD hingga SMA.",
            tambahan: null,
            url: "/produk/tryout",
          },
        ],
      },
      testimoni: {
        judul: "Ratusan alumni UjiAja Berhasil mewujudkan kampus impian",
        deskripsi: "",
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
};
</script>