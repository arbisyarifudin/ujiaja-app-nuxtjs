<template>
  <div>
    <Header variant="melengkung no-hero" :navData="navData" />
    <div class="hero-tryout bg-white">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2>Tes MBTI</h2>
            <p>
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quibusdam rerum eveniet dolore. Expedita at reprehenderit mollitia repellat accusamus sit, voluptates quam quaerat culpa, minus aperiam deleniti libero sunt veniam.
            </p>
            <hr
              color="#7370FB"
              width="50%"
              style="height: 3px; border-radius: 10px"
            />
          </div>
        </div>
      </div>
    </div>
    <SectionKeunggulan :props="keunggulan" />
    <SectionLangkah :props="langkah" />
    <SectionPertanyaan :items="pertanyaan" style="margin-top: 80px" />
    <SectionCardHero
      src="/tryoututbk.png"
      title="Siap untuk masuk kampus impian bersama UjiAja?"
      description="Tunggu apa lagi? Mari bergabung dengan UjiAja dan menjadi pemenang di Tryout UTBK!"
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
      title: 'Tryout UTBK',
    }
  },
  data() {
    return {
      header: {
        hero: {
          judul: "Siap Lolos Sekolah & PTN Impian Bareng UjiAja!",
          subjudul:
            "Gunakan Platform Tryout Terbaik Untuk Tingkatkan Kesiapanmu. Hadapi Masuk Jenjang SMP, SMA dan Perguruan Tinggi negeri!",
          ctaButtonText: "Daftar Sekarang",
          ctaButtonVariant: "primary",
          cataButtonUrl: "/registrasi",
          image: "/hero-tryout.png",
          isJudulFirst: false,
        },
      },
      keunggulan: {
        judul: "Kenapa kamu wajib coba tryout uTBK?",
        item: [
          {
            gambar: "/icon/utbk1.png",
            judul: "Sistem UTBK Terbaru",
          },
          {
            gambar: "/icon/utbk2.png",
            judul: "Soal dan Pembahasan Berkualitas",
          },
          {
            gambar: "/icon/utbk3.png",
            judul: "Penilaian dengan sistem IRT",
          },
        ],
      },
      langkah: {
        judul: "Cara Daftar Tryout UTBK",
        langkah: [
          {
            judul: "Daftar",
            deskripsi:
              'Masuk ke Web UjiAja Untuk Siswa, lalu pilih menu "Tryout", lalu pilih Tryout UTBK yang diinginkan untuk melihat informasi dan harga.',
          },
          {
            judul: "Konfirmasi Pembelian & Checkout",
            deskripsi:
              "Tekan tombol “Beli” untuk konfirmasi pembelian dan tekan tombol “Checkout” untuk mengetahui jumlah yang harus dibayarkan.",
          },
          {
            judul: "Pilih Metode Pembayaran & Lakukan Pembayaran",
            deskripsi:
              "Pilih metode pembayaran, tekan tombol “Bayar”. Tryout UTBK yang dibeli telah aktif dan siap digunakan siswa.",
          },
        ],
      },
      pertanyaan: [
        {
          q: "Apa itu TryOut UTBK?",
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
          q: "Apakah pengerjaan TryOut UTBK di UjiAja bisa melalui laptop/PC?",
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
          q: "Kalau saya sudah terdaftar dalam TryOut UTBK, apakah saya bisa mengerjakan TryOut di luar jadwal?",
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
          q: "Apakah pengerjaan TryOut UTBK di UjiAja bisa dicicil/dijeda?",
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
          q: "Apakah soal dan pembahasan TryOut bisa didownload?",
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