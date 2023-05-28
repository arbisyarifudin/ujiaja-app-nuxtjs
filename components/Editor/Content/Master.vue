<template>
  <div class="container-fluid">
    <div class="row" v-for="(content, i) in contents" :key="i">
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
          :initial-value="original[i].judul"
          v-model="content.judul"
          placeholder="Isi Judul baru"
        >
          <template #title>Judul</template>
        </EditorText>
      </div>
      <div class="form-user col-md-12">
        <EditorTextArea :initial-value="original[i].text" v-model="content.text">
          <template #title>Text</template>
        </EditorTextArea>
      </div>
      <div class="form-user col-md-12 pt-3">
        <EditorText
          :initial-value="original[i].tombol"
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
      <div class="col-md-12 border-top pt-3 mt-1">
        <button @click="addNewCarousel" class="btn btn-outline-primary">
          + Tambah Carousel Banner
        </button>
      </div>
      <!-- <div v-if="contents.length > 1" class="col-md-12">
        <div class="row justify-content-end">
          <button @click="deleteCarousel" class="btn btn-outline-danger col-md-3">Hapus Carousel</button>
        </div>
      </div> -->
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
  methods: {
    addNewCarousel() {
      this.contents.push({
        id: "",
        banner: "",
        gambar: "",
        judul: "",
        text: "",
        sub_content: [
          {
            link: '',
            tombol: ''
          }
        ],
      });
      this.original.push({
        id: "",
        banner: "",
        gambar: "",
        judul: "",
        text: "",
        sub_content: [
          {
            link: '',
            tombol: ''
          }
        ],
      });
    },
    deleteCarousel() {
      this.contents.pop()
    }
  },
};
</script>
