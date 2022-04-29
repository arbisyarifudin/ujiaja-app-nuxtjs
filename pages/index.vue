<template>
  <div>
    <Header :heroData="header.hero" :navData="navData"/>
    <SectionKeunggulan :props="keunggulan" variant="with-bg"/>
    <SectionProduk :props="produk" />
    <SectionFitLayanan />
    <SectionCardHero
      src="/fitur/layanan-3.png"
      title="Nikmati kemudahan belajar
    di UjiAja"
      description="Uji Tes Minat Bakat, Latihan Soal Tryout, dan belajar Les Privat di UjiAja itu menyenangkan!  So, kamu dapat nikmati fitur-fitur UjiAja lebih lengkap tanpa batas dengan membeli Tryout Premium."
      href="/app/tryout"
      cta-text="Lihat Tryout"
    />
    <SectionTryoutAkbar />
    <SectionProgramStudi />
    <SectionTestimoni :props="testimoni" />
    <SectionCardHero
      src="/hero-lagi-person.png"
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
          ctaButtonVariant: "secondary",
          cataButtonUrl: "/registrasi",
          image: "/banner-2.png",
          isJudulFirst: true
        }
      },
      keunggulan: {
        judul: "Kenapa Harus Pakai UjiAja.com?",
        item: [
          {
            gambar: "/icon/icon1_2.png",
            judul: "200.000+",
            subjudul: "Pelajar Indonesia yang sudah pakai aplikasi UjiAja"
          },
          {
            gambar: "/icon/icon2_2.png",
            judul: "150.000 soal+",
            subjudul:
              " Jumlah soal dan pembahasan Tryout terbaru sesuai kurikulum"
          },
          {
            gambar: "/icon/icon3_2.png",
            judul: "100.000 siswa+",
            subjudul: "Peserta Tryout SSCI terbukti lolos PTN impian"
          },
          {
            gambar: "/icon/icon4.png",
            judul: "99%",
            subjudul:
              "99% pelajar merasa terbantu dan cocok dengan guru privat UjiAja"
          }
        ]
      },
      produk: {
        judul: "Produk UjiAja",
        deskripsi:
          "UjiAja menyediakan semua amunisi yang kamu butuhkan untuk menuju kampus impianmu!<br /> Belajar efektif dengan rangkuman lengkap serta ratusan soal yang variatif dan menantang.",
        item: [
          {
            gambar: "/produk/produk1_2.png",
            judul: "Tryout",
            brand: "by UjiAja",
            deskripsi:
              "Persiapkan dirimu hadapi Tryout PAT, PAS, hingga UTBK melalui latihan Tryout yang akurat dan lengkap dengan fitur terbaik.",
            tambahan: "Gratis Tes Minat, Bakat & Potensi",
            url: "/produk/tryout"
          },
          {
            gambar: "/produk/produk2_2.png",
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
            nama: "Zabina Asfahani",
            titel: "Teknik Industri - Universitas Gajah Mada",
            testimoni:
              'Bisa masuk Universitas Gadjah Mada adalah IMPIAN terbesarku. Belajar dan berlatih adalah ikhtiarku. Syukur alhamdulillah aku coba mendaftar platform pendidikan ujiaja yang didalamnya terdapat fasilitas tryout UTBK. Wuihhhh...yang tadinya udah MAGER buat ikutan tryout, sekali nyoba jadi ketagihan. Kerennnn....aksesnya mudah, soal-soalnya prediktif, durasi pengerjaannya juga disesuaikan dengan UTBK sebenarnya, dan hasil tryoutnya disuguhkan dalam bentuk sertifikat yang isinya lengkap. Karena rajin berlatih, akhirnya usahaku berbuah baik. Aku tembus TEKNIK INDUSTRI UGM.',
            foto: "foto-gambar/zabina.png"
          },
          {
            nama: "Fadlan Azzam",
            titel: "Manajemen  - UPN “VETERAN” YOGYAKARTA",
            testimoni:
              "Proses meraih impian itu penuh perjuangan. Karena aku mengambil rumpun Soshum, mau tidak mau habit gemar membaca kudu dibentuk dan dibiasakan. Syukur alhamdulillah aku didampingi oleh aplikasi ujiaja yang berperan besar dalam perjuanganku untuk bisa LOLOS PTN. Yang semula MALES kalau udah denger kata TRYOUT, sekarang SUKA BANGET ikut tryout. Tryout ujiaja beda dengan tryout lainnya. Di ujiaja gampang banget daftarnya, murah banget biayanya, dan tentunya akses masuk aplikasinya juga mudah dan praktis. Ga’ pake ribet dech... selain itu, soal dan pembahasannya bisa di download sehingga bisa jadi bahan untuk review materi. Dengan banyak berlatih di ujiaja akhirnya aku bisa masuk PTN dengan prodi Manajemen yang aku impikan. Terimakasih ujiaja... ujiaja emang The Best.",
            foto: "foto-gambar/azzam.png"
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
  },
  created() {
    // console.log(this.$store.getters['checkIsAuth'])
    if(this.$store.getters['checkIsAuth']) {
      this.header.hero.ctaButtonText = 'Pergi ke Dashboard'
      this.header.hero.cataButtonUrl = '/app/dashboard'
    }
  }
};
</script>
