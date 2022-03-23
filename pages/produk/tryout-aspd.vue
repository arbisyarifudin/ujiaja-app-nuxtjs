<template>
  <div>
    <Header variant="melengkung no-hero" :navData="navData" />
    <div class="hero-tryout bg-white">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2>Tryout ASPD</h2>
            <p>
              Matangkan persiapanmu dengan latihan soal Asesmen Standar
              Pendidikan Daerah Yogyakarta (Bahasa Indonesia, Matematika, Bahasa
              Inggris, dan Ilmu Pengetahuan Alam (IPA)). Uji kemampuanmu dalam
              menjawab soal ASPD lewat Tryout Asesmen Standar Pendidikan Daerah
              terlengkap. Daftar dan coba sekarang Juga!
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
      src="/tryoutaspd_3.png"
      title="Siap Hadapi Tryout Asesmen Pendidikan Daerah bersama UjiAja?"
      description="Tunggu apa lagi? Mari bergabung dengan UjiAja
dan menjadi pemenang di Tryout ASPD!"
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
      title: 'Tryout ASPD',
    }
  },
  data() {
    return {
      keunggulan: {
        judul:
          "Kenapa kamu wajib coba tryout Asessmen Standar Pendidikan Daerah (ASPD)?",
        item: [
          {
            gambar: "/icon/utbk1.png",
            judul: "Soal Sesuai Dengan ASPD Disdik Provinsi DIY",
            subjudul:
              "Soal ASPD yang disediakan di UjiAja sangat mirip dengan ASPD Disdik DIY",
          },
          {
            gambar: "/icon/utbk2.png",
            judul: "Ujian Berbasis Komputer & Adaptif ",
            subjudul:
              "Ujian dilaksanakan berbasis komputer atau Computer Based Test (CBT)",
          },
          {
            gambar: "/icon/utbk3.png",
            judul: "Jumlah Soal Sesuai Asesmen Sebenarnya",
            subjudul: "Jumlah soal sesuai asesmen yang sebenarnya",
          },
        ],
      },
      langkah: {
        judul: "Cara Daftar Tryout Asessmen Standar Pendidikan Daerah (ASPD)",
        langkah: [
          {
            judul: "Daftar",
            deskripsi:
              'Masuk ke Web UjiAja Untuk Siswa, lalu pilih menu "Tryout", lalu pilih Tryout ASPD yang diinginkan untuk melihat informasi dan harga.',
          },
          {
            judul: "Konfirmasi Pembelian & Checkout",
            deskripsi:
              "Tekan tombol “Beli” untuk konfirmasi pembelian dan tekan tombol “Checkout” untuk mengetahui jumlah yang harus dibayarkan.",
          },
          {
            judul: "Pilih Metode Pembayaran & Lakukan Pembayaran",
            deskripsi:
              "Pilih metode pembayaran, tekan tombol “Bayar”. Tryout Asesmen Daerah yang dibeli telah aktif dan siap digunakan siswa.",
          },
        ],
      },
      pertanyaan: [
        {
          q: "Apa itu TryOut Asesmen Standar Pendidikan Daerah?",
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
          q: "Apakah pengerjaan TryOut Asesmen Standar Pendidikan Daerah di UjiAja bisa melalui laptop/PC?",
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
          q: "Kalau saya sudah terdaftar dalam TryOut Asesmen Standar Pendidikan Daerah, apakah saya bisa mengerjakan di luar jadwal?",
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
          q: "Apakah pengerjaan TryOut Asesmen Standar Pendidikan Daerah di UjiAJa bisa dicicil/dijeda?",
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