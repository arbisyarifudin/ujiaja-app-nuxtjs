<template>
  <div>
    <Header variant="melengkung primary no-hero" :navData="navData" />
    <div class="hero-tryout bg-white">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2>Tryout UTBK</h2>
            <p>
              Matangkan pilihan jurusanmu, raih dan perjuangkan dengan latihan
              soal-soal UTBK. Daftar dan rasakan dasyatnya try out online di
              UjiAja!
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
    <!-- Banner tambahan untuk promo - client req -->
     <div class="container mt-5 mb-5">
       <div class="row">
         <div class="col-3"></div>
          <div class="col-6 center mt-2 mb-2">
            <a href="/user/tryout/search?category&package=Bundling&event">
              <img class="" src="/foto-gambar/paket-bundling.jpeg" alt="Paket Bundling" />
            </a>
          </div>
         <div class="col-3">
         </div>
       </div>
      </div>
    <SectionLangkah :props="langkah" />
    <SectionPertanyaan :items="pertanyaan" style="margin-top: 80px" />
    <SectionCardHero
      src="/tryoututbk_3.png"
      title="Siap untuk masuk kampus impian bersama UjiAja?"
      description="Tunggu apa lagi? Mari bergabung dengan UjiAja dan menjadi pemenang di UTBK SBMPTN….!"
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
      title: "Tryout UTBK"
    };
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
          isJudulFirst: false
        }
      },
      keunggulan: {
        judul: "Kenapa kamu wajib coba tryout uTBK?",
        item: [
          {
            gambar: "/icon/utbk1.png",
            judul: "Sistem UTBK Terbaru"
          },
          {
            gambar: "/icon/utbk2.png",
            judul: "Soal-soal Prediktif Standar LTMPT dan Pembahasan yang Berkualitas"
          },
          {
            gambar: "/icon/utbk1.png",
            judul: "Ada tes minat, bakat dan potensi akademik"
          },
          {
            gambar: "/icon/utbk3.png",
            judul: "Penilaian dengan sistem IRT"
          },
          {
            gambar: "/icon/utbk1.png",
            judul: "Disertai pilihan prodi/jurusan PTN seluruh Indonesia"
          },
          {
            gambar: "/icon/utbk1.png",
            judul: "Skoring Hasil Tryout disertai peluang kelulusan"
          },
          {
            gambar: "/icon/utbk1.png",
            judul: "Analisis butir soal dan rekomendasi belajar"
          },
          {
            gambar: "/icon/utbk1.png",
            judul: "Statistik Progres Belajar yang lengkap"
          },
        ]
      },
      langkah: {
        judul: "Cara Daftar Tryout UTBK",
        langkah: [
          {
            judul: "Daftar",
            deskripsi:
              'Masuk ke Web UjiAja Untuk Siswa, lalu pilih menu "Tryout", lalu pilih Tryout UTBK yang diinginkan untuk melihat informasi dan harga.'
          },
          {
            judul: "Konfirmasi Pembelian & Checkout",
            deskripsi:
              "Tekan tombol “Beli” untuk konfirmasi pembelian dan tekan tombol “Checkout” untuk mengetahui jumlah yang harus dibayarkan."
          },
          {
            judul: "Pilih Metode Pembayaran & Lakukan Pembayaran",
            deskripsi:
              "Pilih metode pembayaran, tekan tombol “Bayar”. Tryout UTBK yang dibeli telah aktif dan siap digunakan siswa."
          }
        ]
      },
      pertanyaan: [
        {
          q: "Apa itu TryOut UTBK?",
          a: `TryOut UTBK UjiAja adalah platform belajar online melalui simulasi/tryout dalam mengerjakan soal-soal UTBK dengan sistem dan model yang biasa diselenggarakan oleh Panitia  Lembaga Tes Masuk Perguruan Tinggi (LTMPT). Sistem yang didesain berbasis digital ini harapannya mampu menghadirkan solusi yang lebih baik dan tepat guna untuk membantu para siswa-siswa di seluruh Indonesia dalam mengetahui minat bakat, menguji kemampuan, serta memberikan arahan fokus belajar untuk menggapai mimpinya bisa masuk perguruan tinggi idaman.`
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
          synth nesciunt you probably haven't heard of them accusamus labore VHS.`
        },
        {
          q:
            "Kalau saya sudah terdaftar dalam TryOut UTBK, apakah saya bisa mengerjakan TryOut di luar jadwal?",
          a: `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.`
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
          synth nesciunt you probably haven't heard of them accusamus labore VHS.`
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
          synth nesciunt you probably haven't heard of them accusamus labore VHS.`
        }
      ]
    };
  },
  asyncData(context) {
    function getSetting(key) {
      const settings = context.store.state.dataSetting;
      const foundSetting = settings.find(item => item.key == key);
      if (foundSetting) {
        return foundSetting.isi;
      }
      return "";
    }

    const navData = {
      logo: getSetting("logo")
    };

    const footerData = {
      logo: getSetting("logo"),
      alamat_kantor: getSetting("alamat_kantor"),
      telp: getSetting("telp"),
      whatsapp: getSetting("whatsapp"),
      instagram: getSetting("instagram"),
      facebook: getSetting("facebook"),
      youtube: getSetting("youtube"),
      email: getSetting("email")
    };

    return {
      navData,
      footerData
    };
  }
};
</script>
