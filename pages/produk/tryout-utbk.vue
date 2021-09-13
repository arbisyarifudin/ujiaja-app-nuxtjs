<template>
  <div>
    <Header variant="melengkung primary no-hero" />
    <SectionKeunggulan :props="keunggulan" />
    <SectionLangkah :props="langkah" />
    <SectionCardHero
      src="/tryoututbk.png"
      title="Siap untuk masuk kampus impian bersama UjiAja?"
      description="Tunggu apa lagi? Mari bergabung dengan UjiAja dan menjadi pemenang di Tryout UTBK!"
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
        judul: "Kenapa kamu wajib coba tryout uTBK??",
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
    };
  },
};
</script>