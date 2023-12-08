<template>
  <div class="section tryout-akbar">
    <div class="tryout-akbar pb-3">
      <div class="col-md-12 hero-lagi tryout text-center">
        <h2 class="m-0 pb-3">{{ props.judul }}</h2>
        <div class="p-0" v-html="props.text1" />
          <div class="container mt-5 mb-5">
          <!-- <div class="row">
            <div class="col-lg">
               <a href="/app/tryout/search?category=UTBK&package=Reguler&event=Masal">
                  <img class="mt-5 mb-5" src="/foto-gambar/banner-1.jpeg" alt="Tryout Akbar UTBK"/>
               </a>
            </div>
            <div class="col-sm">
               <img class="mt-0 mb-0" src="/foto-gambar/banner-2.jpeg" alt="Cara Daftar Tryout"/>
            </div>
            <div class="col-sm">
               <a href="/app/tryout/search?category=ASPD&package&event">
                 <img class="mt-5" src="/foto-gambar/banner-3.jpeg" alt="Tryout Akbar ASPD" />
               </a>
            </div>
          </div> -->
        </div>
        
        <h4>
          {{  props.sub_judul }}
        </h4>
        <div class="p-0" v-html="props.text2" />
        <a class="btn btn-outline-primary mt-5" :href="props.link"
          >{{ props.tombol }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Section5",
  props: ["props"],
};
</script>
