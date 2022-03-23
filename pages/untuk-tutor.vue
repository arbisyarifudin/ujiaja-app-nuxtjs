<template>
  <div>
    <Header variant="melengkung" :heroData="header.hero" :navData="navData"/>
    <SectionKeunggulan :props="keunggulan" />
    <SectionCardHero
      src="/hero-lagi-tutor1.png"
      title="Bagikan keterampilan mengajar Anda dengan UjiAja"
      description="Bergabunglah dengan kami dan Anda akan memiliki semua yang Anda butuhkan untuk mengajar dengan sukses."
      href="/registrasi"
      cta-text="Daftar Sekarang"
      button
    />
    <SectionLangkah :props="langkah" />
    <SectionTestimoni :props="testimoni" />
    <SectionCardHero
      src="/hero-lagi-tutor2.png"
      title="Dapatkan penghasilan dengan mengajar secara online maupun offline."
      description="Jalin erat dengan ribuan siswa di seluruh Indonesia dengan penuh semangat dan ajari mereka dengan kemampuanmu."
      href="/registrasi"
      cta-text="Daftar Sekarang"
      button
    />
    <Footer :footerData="footerData" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Untuk Tutor',
    }
  },
  data() {
    return {
      header: {
        hero: {
          judul: "Bagikan keahlian Anda Bersama UjiAja",
          subjudul:
            "Dapatkan penghasilan tambahan sebagai pengajar di UjiAja dan hasilkan uang sesuai lokasi dan jadwalmu!",
          ctaButtonText: "Daftar Sekarang",
          ctaButtonVariant: "secondary",
          cataButtonUrl: "/registrasi",
          image: "/banneruntuktutor_3.png",
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
      langkah: {
        judul: "Langkah Pendaftaran",
        langkah: [
          {
            judul: "Registrasi",
            deskripsi:
              "Lakukan pendaftaran pada aplikasi web UjiAja untuk guru.",
          },
          {
            judul: "Isi Form",
            deskripsi:
              'Lengkapi form yang tersedia pada form daftar. Kemudian tekan tombol "Daftar".',
          },
          {
            judul: "Verifikasi Pendaftaran",
            deskripsi:
              'Buka email, cari email dari UjiAja, dan klik tombol "Aktivasi" untuk verifikasi pendaftaran.',
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
            foto: "randy_2.png",
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