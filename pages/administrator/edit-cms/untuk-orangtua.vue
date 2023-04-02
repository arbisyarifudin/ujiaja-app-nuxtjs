<template>
  <div class="col-md-12">
    <UIKonten>
      <template #title>Konten 1</template>
      <EditorContentMaster :content="master" />
      <div class="col-md-12 pt-4">
        <button @click="saveMasterContent" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
    <UIKonten>
      <template #title>Konten 2</template>
      <EditorContentCard v-for="(card, i) in cards" :key="i" :content="card" />
      <div class="col-md-12 pt-3 mt-1 row">
        <button @click="addCardContent" class="btn btn-outline-primary">+ Tambah Sub Konten</button>
        <button @click="deleteCardContent" class="btn btn-outline-danger ml-3">Hapus Sub Konten</button>
      </div>
      <div class="col-md-12 pt-4">
        <button @click="saveCardContent" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
  </div>
</template>

<script>
export default {
  data() {
    return {
      master:{
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
      cards: [
        {
          judul: '',
          card: null,
          posisiGambar: null
        }
      ]
    }
  },
  methods: {
    saveMasterContent() {
      console.log(this.master)
    },
    saveCardContent() {
      console.log(this.cards)
    },
    addCardContent() {
      this.cards.push({
        judul: '',
        card: null,
        posisiGambar: null
      })
    },
    deleteCardContent() {
      this.cards.pop()
    }
  }
}
</script>
