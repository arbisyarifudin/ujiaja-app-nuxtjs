<template>
  <div class="section section-prodi">
    <div class="tryout-akbar no-bg pb-3">
      <div class="col-md-12 mt-3 hero-lagi tryout text-center">
        <h2 class="m-0 pb-3">
          {{ props.judul }}
        </h2>
        <span class="p-0" v-html="props.text1" />
        <div class="col-md-5 mx-auto my-5 brandaplus">
          <img
            class="mt-5 mb-5"
            :src="formatImageSource(props.gambar)"
            alt=""
          />
        </div>
        <h4>
          {{ props.sub_judul }}
        </h4>
        <span class="p-0" v-html="props.text2" />
        <a class="btn btn-outline-primary mt-5" :href="props.link">{{
          props.tombol
        }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionProgramStudi",
  props: ["props"],
  methods: {
    formatImageSource(endpoint) {
      return process.env.apiUrl + `/storage/${endpoint}`;
    },
  },
};
</script>
