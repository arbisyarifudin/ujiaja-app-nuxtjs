<template>
  <div>
    <Header variant="melengkung primary" :heroData="header.hero" :navData="navData"/>
    <SectionKeunggulan :props="keunggulan" variant="bg-transparent" />
    <SectionLangkah :props="langkah" />
    <SectionCardHero
      src="/lesprivat.png"
      title="Apa yang ingin kamu pelajari? Temukan guru privatmu di UjiAja."
      description="Lebih dari ratusan siswa telah memberikan rate dan ulasan yang baik dengan guru mereka."
      href="/registrasi"
      cta-text="Temukan Sekarang"
      button
    />

    <SectionPertanyaan :items="pertanyaan" :footerData="footerData" />

    <Footer />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Les Privat',
    }
  },
  data() {
    return {
      header: {
        hero: {
          judul: "Temukan Guru Les Privat yang Tepat Untukmu",
          subjudul:
            "Tentukan pilihanmu, mau online ataupun tatap muka dengan ratusa guru terbaik dari UjiAja.",
          ctaButtonText: "Temukan Sekarang",
          ctaButtonVariant: "primary",
          cataButtonUrl: "/registrasi",
          image: "/bannerles.png",
          isJudulFirst: false,
        },
      },
      keunggulan: {
        judul: "Mengapa Kamu harus mencoba Temukan Guru Les Privat?",
        item: [
          {
            gambar: "/icon/lesprivat1.png",
            judul: "Guru Les Privat Bersertifikat ",
            subjudul:
              "Guru yang ada pada UjiAja telah bersertifikat dan mendapat banyak ulasan positif dengan rate",
          },
          {
            gambar: "/icon/lesprivat2.png",
            judul: "Guru Selalu Siap Menjawab Pertanyaan",
            subjudul:
              "Guru memberi tanggapan siswa dengan cepat dan bisa kamu ajak diskusi",
          },
          {
            gambar: "/icon/lesprivat3.png",
            judul: "Atur Jadwal Les-mu Sendiri",
            subjudul:
              "Atur pelaksanaan dan jadwal lesmu dengan guru yang kamu pilih.",
          },
        ],
      },
      langkah: {
        judul: "Cara Temukan Guru Les Privat",
        langkah: [
          {
            judul: "Temukan Guru Les Privat",
            deskripsi:
              'Masuk ke Web UjiAja untuk Siswa, lalu pilih menu "Les Privat", cari guru les berdasarkan mata pelajaran. Pilih guru dan lihat informasi mengenai guru yang kamu pilih.',
          },
          {
            judul: "Pesan Les Privat",
            deskripsi:
              "Tekan tombol “Pesan”, pilih jadwal dan tekan tombol “Lanjutkan” untuk proses pembayaran.",
          },
          {
            judul: "Pembayaran dan Verifikasi Guru",
            deskripsi:
              "Lakukan pembayaran sesuai invoice, sistem akan memverifikasi pembayaran dan mengirimkan request ke guru. Tunggu hingga guru memverifikasi dan kamu dapat notifikasi les privat tersebut berhasil diterima guru.",
          },
        ],
      },
      pertanyaan: [
        {
          q: "Dimana Les Privat dilaksanakan?",
          a: `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.`,
        },
        {
          q: "Bagaimana Les Privat dilaksanakan selama masa pandemi covid 19?",
          a: `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.`,
        },
        {
          q: "Apakah saya akan dapat modul pembelajaran?",
          a: `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.`,
        },
        {
          q: "Bagaimana cara mendaftar sebagai siswa?",
          a: `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.`,
        },
        {
          q: "Apakah guru les privat terkualifikasi & berkualitas?",
          a: `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.`,
        },
      ],
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