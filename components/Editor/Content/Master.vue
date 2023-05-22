<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <EditorImage v-model="content.banner" :max-size="5">
          <template #title>
            Banner
          </template>
          <template #warn>
            *Disarankan dengan Banner 1276 x 638 pixel, dan Maksimal 5 Mb
          </template>
        </EditorImage>
      </div>
      <div class="col-md-12">
        <EditorImage v-model="content.gambar" :max-size="5">
          <template #title>
            Gambar
          </template>
          <template #warn>
            *Disarankan dengan Gambar atau Vektor 1276 x 638 pixel, dan Maksimal 5 Mb
          </template>
        </EditorImage>
      </div>
      <div class="form-user col-md-12">
        <EditorText :initial-value="original.judul" v-model="content.judul" placeholder="Isi Judul baru">
          <template #title>Judul</template>
        </EditorText>
      </div>
      <div class="form-user col-md-12">
        <EditorTextArea :initial-value="original.text" v-model="content.text">
          <template #title>Text</template>
        </EditorTextArea>
      </div>
      <div class="col-md-12 border-top pt-3 mt-1">
        <button @click="addSubContent" class="btn btn-outline-primary">+ Tambah Sub Konten</button>
      </div>
      <div v-for="(sc, i) in content.sub_content" :key="i" class="form-user col-md-12 pt-3">
        <EditorText :initial-value="original.sub_content[i]?.tombol" v-model="sc.tombol" placeholder="Isi nama tombol baru">
          <template #title>Tombol</template>
        </EditorText>
        <p class="pt-3">Link</p>
        <div class="form-group row justify-content-between px-3">
          <input v-model="sc.link" placeholder="Isi Link yang ingin di tuju" class="form-control col-md-12" />
        </div>
      </div>
      <div v-if="content.sub_content.length > 1" class="col-md-12">
        <div class="row justify-content-end">
          <button @click="deleteSubContent" class="btn btn-outline-danger col-md-3">Hapus Sub Konten</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => ({})
    },
    original: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    addSubContent() {
      this.content.sub_content.push({
        tombol: '',
        link: ''
      })
      console.log(this.content);
    },
    deleteSubContent() {
      this.content.sub_content.pop()
    }
  }
}
</script>
