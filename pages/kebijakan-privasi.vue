<template>
  <div>
    <Header variant="melengkung no-hero primary" :navData="navData" />
    <div class="page-content kebijakan-privasi bg-white">
      <div class="">
        <h2 class="page-title">Kebijakan Privasi</h2>
        <div class="page-text">
          <p class="text-left">
            Kebijakan Privasi SSCI (“Kebijakan Privasi”) berlaku untuk
            penggunaan Platform, dan ketentuannya dibuat menjadi bagian dari
            Syarat dan Ketentuan Kelas Pintar dan juga Kebijakan Penggunaan.
            Selain itu, dengan menggunakan Platform, Anda mengakui dan setuju
            bahwa penggunaan internet tidak sepenuhnya pribadi atau aman. Anda
            memahami bahwa setiap pesan atau informasi yang Anda kirim ke
            Platform dapat dibaca atau dihadang atau diperoleh oleh pengguna
            lain, tanpa ada pemberitahuan khusus bahwa suatu transmisi tertentu
            terenkripsi.
          </p>

          <p>
            Dengan mengakses dan menggunakan Platform, Anda dianggap telah
            membaca, memahami dan memberikan persetujuan kepada SSCI untuk
            pengumpulan, pemrosesan, pengungkapan dan penggunaan informasi dan
            juga data pribadi Anda sebagaimana diuraikan di bawah ini secara
            menyeluruh. Ketentuan Kebijakan Privasi ini dapat diubah atau
            diperbaharui sewaktu-waktu tanpa ada pemberitahuan/ pengumuman
            terlebih dahulu, yang mana suatu perubahan akan segera berlaku
            setelah dipublikasikan di dalam Platform atau secara spesifik
            diberitahukan kepada Anda (yang mana terlebih dahulu). Anda
            diharapkan untuk selalu membaca secara berkala agar mengetahui dan
            memahami perubahan-perubahan yang terjadi pada kebijakan privasi di
            bawah ini.
          </p>

          <h3>A. INFORMASI PENGGUNA</h3>

          <p>
            Semua dan setiap informasi yang diperoleh dari Anda adalah informasi
            yang Anda berikan secara sukarela. Informasi tersebut dapat berupa,
            namun tidak terbatas pada, i) data pribadi Anda seperti nama Anda,
            alamat surat, nomor telepon, alamat email, preferensi kontak, ii)
            data lain seperti informasi kartu kredit, alamat protokol internet
            (IP Address), pengenal perangkat dan jenis peramban pada Platform,
            tanggal dan waktu permintaan, URL perujuk Anda, serta informasi
            lainnya yang diperlukan oleh Kelas Pintar (untuk selanjutnya
            seluruhnya atau setia dari informasi-informasi tersebut disebut
            sebagai “Informasi”).
          </p>

          <p>
            Data Anda digunakan dan dilindungi oleh SSCI sesuai dengan peraturan
            perundang-undangan di bidang perlindungan data dan Kebijakan Privasi
            ini. SSCI mengumpulkan, memproses, menggunakan dan mengungkapkan
            informasi Anda sebatas dengan tujuan berikut ini:
          </p>

          <ol class="pl-4">
            <li>Memverifikasi data yang terdapat pada Akun Anda;</li>
            <li>memfasilitasi komunikasi antara Anda dengan Kelas Pintar;</li>
            <li>
              memberikan pengalaman pengguna (user interface) Platform yang
              lebih baik;
            </li>
            <li>
              mempermudah transaksi pembayaran kepada Kelas Pintar serta apabila
              ada permasalahan dalam transaksi tersebut;
            </li>
            <li>
              kepentingan pasar terkait pendidikan pengembangan Platform agar
              Kelas Pintar dapat meningkatkan pelayanan dan/atau menyesuaikan
              Situs untuk &emsp;memberikan layanan dan produk yang paling
              diminati oleh Anda; dan
            </li>
            <li>
              mengelola sebuah kontes, promosi, survei, riset pasar, diskusi
              kelompok fokus atau lainnya dan untuk menyediakan produk atau
              layanan yang relevan.
            </li>
          </ol>

          <p>
            Setiap data yang terdapat pada Akun Anda harus diperbaharui atau
            diperbaiki apabila ada perubahan atau kesalahan guna memastikan
            keseimbangan dan keamanan pada Platform SSCI. Jika pada proses
            pembukaan Akun (sebagaimana diberi definisi pada Bagian D Kebijakan
            Penggunaan) menurut SSCI Anda tidak menyediakan informasi secara
            memadai, maka i) SSCI tidak dapat menyelesaikan proses atau
            menyetujui pembukaan Akun, atau ii) Anda tidak dapat lagi
            menggunakan (jika sudah memiliki sebelumnya) atau mengakses Akun.
          </p>
        </div>
      </div>
    </div>
    <Footer class="bg-white" :footerData="footerData" />
  </div>
</template>

<script>
export default {
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
}
</script>