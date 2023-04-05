<template>
  <div class="col-md-12">
    <UIKonten>
      <template #title>Konten 1</template>
      <EditorContentMaster :content="master" />
      <div class="col-md-12 pt-4">
        <button @click="saveMasterContent" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
  </div>
</template>

<script>
export default {
  data() {
    return {
      master: {
        banner: null,
        gambar: null,
        judul: '',
        text: '',
        subContents: [
          {
            tombol: '',
            link: ''
          }
        ]
      },
    }
  },
  methods: {
    addSubContent() {
      this.contents[0].subContents.push({
        tombol: '',
        link: ''
      })
    },
    deleteSubContent() {
      this.contents[0].subContents.pop()
    },
    saveMasterContent() {
      console.log(this.master)
    },
  }
}
</script>
