<template>
  <div>
    <Header variant="melengkung" :heroData="header.hero" :navData="navData" />
    <SectionKeunggulan :props="keunggulan" />
    <SectionCardHero
      src="/enenguntuksiswa1.png"
      title="Ciptakan Impianmu dan Temukan Potensimu"
      description="Saatnya gapai kuliah impianmu dengan temukan dan pahami potensi diri."
      href="/registrasi"
      cta-text="Tes Sekarang Juga"
      button
    />
    <SectionLangkah :props="langkah" />
    <SectionTestimoni :props="testimoni" />
    <SectionCardHero
      src="/enenguntuksisw2.png"
      title="Ketahui Program Studi yang Cocok Buatmu."
      description="Lihat rekomendasi kecocokanmu diantara lebih dari 300 program studi di Indonesia."
      href="/registrasi"
      cta-text="Tes Sekarang Juga"
      button
    />
    <Footer :footerData="footerData" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Untuk Siswa',
    }
  },
  data() {
    return {
      header: {
        hero: {
          judul: "Wujudkan Kuliah Impianmu!",
          subjudul:
            "Persiapkan kuliah, dan potensimu dengan pilihan yang tepat sesuai minat dan bakat",
          ctaButtonText: "Tes Sekarang Juga",
          ctaButtonVariant: "primary",
          cataButtonUrl: "/registrasi",
          image: "/banneruntuksiswa.png",
          isJudulFirst: false,
        },
      },
      keunggulan: {
        judul: "Mengapa harus tes minat bakat di UjiAja?",
        item: [
          {
            gambar: "/icon/untuksiswa1.png",
            judul: "Melakukan beragam jenis tes",
            subjudul: "Terdiri dari Kepribadian dan Tes Minat & Bakat.",
          },
          {
            gambar: "/icon/untuksiswa2.png",
            judul: "Memberikan rekomendasi Untukmu",
            subjudul:
              "Dapatkan program studi dan kampus yang cocok denganmu sesuai hasil tes.",
          },
          {
            gambar: "/icon/untuksiswa3.png",
            judul: "Rasionalisasi Nilai",
            subjudul:
              "Ketahui rasionalisasi nilaimu untuk masuk ke jurusan dan kampus impianmu",
          },
        ],
      },
      langkah: {
        judul: "Langkah Mengerjakan Tes Minat & Bakat",
        langkah: [
          {
            judul: "Login",
            deskripsi:
              "Masuk ke aplikasi web UjiAja untuk siswa, Pilih menu Tes Minat & Bakat.",
          },
          {
            judul: "Mengerjakan Tes Minat & Bakat",
            deskripsi:
              'Daftar soal tes tampil dan tekan tombol “Mulai” untuk mengerjakan tes hingga selesai serta akhiri dengan tombol "Selesai".',
          },
          {
            judul: "Hasil Tes Minat & Bakat",
            deskripsi:
              "Sistem menampilkan hasil tes minat & bakatmu. Kamu bisa mencetaknya.",
          },
        ],
      },
      testimoni: {
        judul: "Apa Kata Mereka Tentang tes ini?",
        deskripsi: "",
        varian: "secondary",
        item: [
          {
            nama: "Emerson Curtis",
            titel: "SMAN 1 Yogyakarta",
            testimoni:
              "Sangat bermanfaat, disekolah ku memang ada bk tapi karena kesibukan jam pelajaran tidak sempat berkonsul oleh karena itu aplikasi ini sangat bermanfaat bagi siswa seperti saya. Terimakasih",
            foto: "emerson.png",
          },
          {
            nama: "Brandon Vaccaro",
            titel: "SMAN 1 Sleman",
            testimoni:
              "Keren banget! Jadi bisa tau mana potensi diri yang  harus disesuaikan saat ambil jurusan kuliah nanti. Cakep parah deh UjiAja!",
            foto: "brandon.png",
          },
        ],
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