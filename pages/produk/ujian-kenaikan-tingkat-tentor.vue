<template>
  <div>
    <Header variant="melengkung primary no-hero" :navData="navData" />
    <div class="hero-tryout bg-white">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2>Ujian Kenaikan Tingkat Tentor (UKTT)</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio
              laoreet quis in tincidunt donec nibh sed mi. Ipsum elementum mi
              ornare diam sed tortor etiam est. Diam amet, nisi, ultrices vel
              metus. Sit dapibus nisl aliquam nullam amet eget eget feugiat.
              Fusce.
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
      src="/tryoutaspd.png"
      title="Siap Hadapi Ujian Kenaikan Tingkat Tentor bersama UjiAja?"
      description="Tunggu apa lagi? Mari bergabung dengan UjiAja
dan menjadi pemenang di UKTT!"
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
      title: 'Ujian Kenaikan Tingkat Tentor (UKTT)',
    }
  },
  data() {
    return {
      keunggulan: {
        judul: "Kenapa kamu wajib coba Ujian Kenaikan Tingkat Tentor (UKTT)?",
        item: [
          {
            gambar: "/icon/ujian1.png",
            judul: "Viverra massa integer.",
            subjudul:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
          },
          {
            gambar: "/icon/ujian2.png",
            judul: "Et risus posuere donec.",
            subjudul:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
          },
          {
            gambar: "/icon/ujian3.png",
            judul: "Quis adipiscing semper.",
            subjudul:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
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
              "Pilih metode pembayaran, tekan tombol “Bayar”. Tryout UKTT yang dibeli telah aktif dan siap digunakan guru.",
          },
        ],
      },
      pertanyaan: [
        {
          q: "Apa itu Lorem ipsum dolor sit amet?",
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
          q: "Apa itu Lorem ipsum dolor sit amet?",
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
          q: "Apa itu Lorem ipsum dolor sit amet?",
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
          q: "Apa itu Lorem ipsum dolor sit amet?",
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
          q: "Apa itu Lorem ipsum dolor sit amet?",
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