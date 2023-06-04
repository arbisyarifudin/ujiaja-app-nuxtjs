<template>
  <div class="container-fluid">
    <div class="row border-top pt-4" v-for="(content, i) in contents" :key="i">
      <div class="col-md-12">
        <EditorImage v-model="content.banner" :max-size="5">
          <template #title> Banner </template>
          <template #warn>
            *Disarankan dengan Banner 1276 x 638 pixel, dan Maksimal 5 Mb
          </template>
        </EditorImage>
      </div>
      <div class="col-md-12">
        <EditorImage v-model="content.gambar" :max-size="5">
          <template #title> Gambar </template>
          <template #warn>
            *Disarankan dengan Gambar atau Vektor 1276 x 638 pixel, dan Maksimal
            5 Mb
          </template>
        </EditorImage>
      </div>
      <div class="form-user col-md-12">
        <EditorText
          :initial-value="original[i]?.judul"
          v-model="content.judul"
          placeholder="Isi Judul baru"
        >
          <template #title>Judul</template>
        </EditorText>
      </div>
      <div class="form-user col-md-12">
        <EditorTextArea
          :initial-value="original[i]?.text"
          v-model="content.text"
        >
          <template #title>Text</template>
        </EditorTextArea>
      </div>
      <div class="form-user col-md-12 pt-3">
        <EditorText
          :initial-value="original[i]?.tombol"
          v-model="content.tombol"
          placeholder="Isi nama tombol baru"
        >
          <template #title>Tombol</template>
        </EditorText>
        <p class="pt-3">Link</p>
        <div class="form-group row justify-content-between px-3">
          <input
            v-model="content.link"
            placeholder="Isi Link yang ingin di tuju"
            class="form-control col-md-12"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 border-top pt-3 mt-1 d-flex flex-row">
        <button class="btn btn-outline-primary" @click="addNewCarousel">
          + Tambah Carousel Banner
        </button>
        <button
          v-if="contents.length > 1"
          class="btn btn-outline-danger ml-3"
          @click="deleteCarousel"
        >
          Hapus Carousel Banner
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contents: {
      type: Object,
      default: () => ({}),
    },
    original: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["delete"],
  methods: {
    addNewCarousel() {
      this.contents.push({
        id: "",
        banner: "",
        gambar: "",
        judul: "",
        text: "",
        tombol: "",
        link: "",
      });
      this.original.push({
        id: "",
        banner: "",
        gambar: "",
        judul: "",
        text: "",
        tombol: "",
        link: "",
      });
    },
    deleteCarousel() {
      this.$emit("delete", true);
    },
  },
};
</script>
