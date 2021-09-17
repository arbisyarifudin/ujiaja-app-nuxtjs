<template>
  <div>
    <Header variant="melengkung primary no-hero" />
    <div class="hero-tryout bg-white">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2>Tryout Asesmen Nasional</h2>
            <p>
              Matangkan persiapanmu dengan latihan soal Asesmen Kompetensi
              minimum (Literasi dan Numerasi). Uji kemampuanmu dalam menjawab
              soal AKM lewat Tryout Asesmen Nasional terlengkap. Daftar dan coba
              sekarang Juga!
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
      src="/tryoutasesmen.png"
      title="Siap Hadapi Tryout Asesmen Nasional bersama UjiAja?"
      description="Tunggu apa lagi? Mari bergabung dengan UjiAja
dan menjadi pemenang di Tryout Asesmen Nasional!"
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
        judul: "Kenapa kamu wajib coba Tryout Asesmen Nasional?",
        item: [
          {
            gambar: "/icon/utbk1.png",
            judul: "Soal Sesuai Dengan AKM PUSMENJAR Kemendikbud",
            subjudul: "AKM, Survei Karakter, Survei Lingkungan Belajar",
          },
          {
            gambar: "/icon/utbk2.png",
            judul: "Ujian Berbasis Komputer & Adaptif",
            subjudul:
              "Ujian dilaksanakan berbasis komputer seperti UTBK dan bersifat adaptif",
          },
          {
            gambar: "/icon/utbk3.png",
            judul: "Jumlah Soal Sesuai Asesmen Sebenarnya",
            subjudul:
              "Jumlah soal sesuai asesmen yang sebenarnya (literasi membaca: 36 butir dan numerasi: 36 butir)",
          },
        ],
      },
      langkah: {
        judul: "Cara Daftar Tryout Asesmen Nasional",
        langkah: [
          {
            judul: "Daftar",
            deskripsi:
              'Masuk ke Web UjiAja Untuk Siswa, lalu pilih menu "Tryout", lalu pilih Tryout Asesmen Nasional yang diinginkan untuk melihat informasi dan harga.',
          },
          {
            judul: "Konfirmasi Pembelian & Checkout",
            deskripsi:
              "Tekan tombol “Beli” untuk konfirmasi pembelian dan tekan tombol “Checkout” untuk mengetahui jumlah yang harus dibayarkan.",
          },
          {
            judul: "Pilih Metode Pembayaran & Lakukan Pembayaran",
            deskripsi:
              "Pilih metode pembayaran, tekan tombol “Bayar”. Tryout Asesmen Nasional yang dibeli telah aktif dan siap digunakan siswa.",
          },
        ],
      },
      pertanyaan: [
        {
          q: "Apa itu TryOut Asesmen Nasional?",
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
          q: "Apakah pengerjaan TryOut Asesmen Nasional di UjiAja bisa melalui laptop/PC?",
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
          q: "Kalau saya sudah terdaftar dalam TryOut Asesmen Nasional, apakah saya bisa mengerjakan di luar jadwal?",
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
          q: "Apakah pengerjaan TryOut Asesmen Nasional di UjiAJa bisa dicicil/dijeda?",
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
};
</script>