<template>
  <div>
    <Header :heroData="header.hero" :navData="navData"/>
    <SectionKeunggulan :props="keunggulan" />
    <SectionProduk :props="produk" />
    <SectionFitLayanan />
    <SectionCardHero
      src="/fitur/layanan.png"
      title="Nikmati kemudahan belajar
    di UjiAja"
      description="Uji Tes Minat Bakat, Latihan Soal Tryout, dan
    belajar di UjiAja itu menyenangkan! Tapi, kamu dapat nikmati fitur-fitur
    UjiAja lebih lengkap tanpa batas dengan membeli Tryout Premium."
      href="/app/tryout"
      cta-text="Lihat Tryout"
    />
    <SectionTryoutAkbar />
    <SectionProgramStudi />
    <SectionTestimoni :props="testimoni" />
    <SectionCardHero
      src="/eneng.png"
      title="Ribuan Pesaingmu Mulai Persiapkan Diri"
      description="Tunggu apa lagi? Ayo bergabung dengan UjiAja dan belajar bareng bersama UjiAja!"
      href="/registrasi"
      cta-text="Daftar Sekarang"
      button
    />
    <Footer :footerData="footerData"/>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.navData.seo_web_name ?? 'Ujiaja.com',
      titleTemplate: '%s'
    }
  },
  data() {
    return {
      header: {
        hero: {
          subjudul: "Bersama UjiAja, mengerjakan soal terasa lebih mudah",
          judul: "Yuk Belajar Dengan UjiAja Agar Makin Siap Hadapi Ujian",
          ctaButtonText: "Daftar Sekarang",
          ctaButtonVariant: "outline-primary",
          cataButtonUrl: "/registrasi",
          image: "/banner.png",
          isJudulFirst: true
        }
      },
      keunggulan: {
        judul: "Kenapa Harus Pakai UjiAja.com?",
        item: [
          {
            gambar: "/icon/icon1.png",
            judul: "20rb+",
            subjudul: "Pelajar Indonesia yang sudah pakai aplikasi SSCI"
          },
          {
            gambar: "/icon/icon2.png",
            judul: "150soal+",
            subjudul:
              " Jumlah soal dan pembahasan Tryout terbaru sesuai kurikulum"
          },
          {
            gambar: "/icon/icon3.png",
            judul: "100siswa+",
            subjudul: "Peserta Tryout SSCI terbukti lolos PTN impian"
          },
          {
            gambar: "/icon/icon4.png",
            judul: "99%",
            subjudul:
              "99% pelajar merasa terbantu dan cocok dengan guru privat SSCI"
          }
        ]
      },
      produk: {
        judul: "Produk UjiAja",
        deskripsi:
          "UjiAja menyediakan semua amunisi yang kamu butuhkan untuk menuju kampus impianmu!<br /> Belajar efektif dengan rangkuman lengkap serta ratusan soal yang variatif dan menantang.",
        item: [
          {
            gambar: "/produk/produk1.png",
            judul: "Tryout",
            brand: "by UjiAja",
            deskripsi:
              "Persiapkan dirimu hadapi Tryout UTBK hingga ASPD dengan latihan Tryout yang akurat dan lengkap dengan fitur terbaik.",
            tambahan: "Gratis Tes Minat, Bakat & Potensi",
            url: "/produk/tryout"
          },
          {
            gambar: "/produk/produk2.png",
            judul: 'Les<span class="large">Privat</span>',
            brand: "by UjiAja",
            deskripsi:
              "Temukan guru privat untuk belajar eksklusif 1 murid 1 guru. Semua pelajaran, semua usia!",
            tambahan: null,
            url: "/produk/les-privat"
          }
        ]
      },
      testimoni: {
        judul: "Apa Kata Mereka Tentang UjiAja?",
        deskripsi: "Dengarkan apa kata mereka tentang UjiAja",
        item: [
          {
            nama: "Danang Setiawan",
            titel: "Ilmu Komputer - Universitas Gajah Mada",
            testimoni:
              'Pertama kali ikut TO di UjiAja bulan Januari. First impression awalnya kayak, "Gila, soalnya sulit bener". Terus akhirnya jadi makin tertantang buat terus belajar dan ngejar materi-materi yang kurang. Terima kasih UjiAja, berkat ikut TO-mu, aku diterima di FIK UGM dengan skor UTBK yang menurutku lumayan memuaskan. Ayo yang belum pernah ikut TO di UjiAja, buruan gih ikutan!!',
            foto: "danang.png"
          },
          {
            nama: "Rizky Ristanto",
            titel: "Teknik Fisika - Universitas Gajah Mada",
            testimoni:
              "UjiAja dari zaman UTBK 2020 sampai sekarang tryout nya menampar banget buat aku yang males. Apalagi sekarang udah kuliah, kalo les juga bakal keluar uang banyak. Akhirnya aku join tryout di UjiAja lagi. Tiap habis tryout aku analisis kesalahanku di materi apa, aku pahami pembahasannya. Hasil monitoring tiap tryout di UjiAja, nilaiku meningkat karena belajar dari kesalahan. Terima kasih.",
            foto: "rizky.png"
          }
        ]
      }
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
      seo_web_name: getSetting('seo_web_name'),
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
  }
};
</script>
