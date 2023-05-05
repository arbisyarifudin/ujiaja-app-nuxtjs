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
    <UIKonten>
      <template #title>Konten 3</template>
      <div class="container-fluid">
        <div class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorText v-model="testimony.master.judul" placeholder="Isi Judul baru">
              <template #title>Judul</template>
            </EditorText>
          </div>
        </div>
        <div v-for="(t, i) in testimony.testimonies" :key="i" class="row border-bottom">
          <div class="col-md-12 pt-2">
            <EditorImage v-model="t.gambar" :max-size="5">
              <template #title>
                Gambar
              </template>
              <template #warn>
                *Disarankan dengan Banner 1276 x 638 pixel, dan Maksimal 5 Mb
              </template>
            </EditorImage>
          </div>
          <div class="form-user col-md-12">
            <EditorText v-model="t.nama" placeholder="Isi Nama baru">
              <template #title>Nama</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorText v-model="t.jurusan" placeholder="Isi Jurusan baru">
              <template #title>Jurusan</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="t.text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12 pt-3">
            <EditorText v-model="t.tombol" placeholder="Isi nama tombol baru">
              <template #title>Tombol</template>
            </EditorText>
            <p class="pt-3">Link</p>
            <div class="form-group row justify-content-between px-3">
              <input v-model="t.link" placeholder="Isi Link yang ingin di tuju" class="form-control col-md-12" />
            </div>
          </div>
        </div>
        <div class="row py-2 border-bottom">
          <button @click="addTestimonyContent" class="btn btn-outline-primary">+ Tambah Testimoni</button>
          <button @click="deleteTestimonyContent" class="btn btn-outline-danger ml-3">- Hapus Testimoni</button>
        </div>
      </div>
      <div class="col-md-12 pt-4">
        <button @click="saveTestimonyContent" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
  </div>
</template>

<script>
import objectToFormData from '../../../helpers/object-to-form-data'

export default {
  data() {
    return {
      master:{
        banner: null,
        gambar: null,
        judul: '',
        text: '',
        sub_content: [
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
      ],
      testimony: {
        master: {
          judul: ''
        },
        testimonies: [
          {
            gambar: null,
            nama: '',
            jurusan: '',
            text: '',
            tombol: '',
            link: ''
          }
        ]
      }
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
    },
    addTestimonyContent() {
      this.testimony.testimonies.push({
            gambar: null,
            nama: '',
            jurusan: '',
            text: '',
            tombol: '',
            link: ''
      })
    },
    deleteTestimonyContent() {
      this.testimony.testimonies.pop()
    },
    async saveMasterContent() {
      try {
        const payload = objectToFormData({ konten1: this.master })
        const res = await this.$axios.post('/api/cms/untuk-orangtua', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (res.status === 200) window.alert("berhasil mengubah kontent")
      } catch (e) {
        window.alert("gagal menyimpan konten")
      }
    },
    async saveCardContent() {
      try {
        const payload = objectToFormData({ konten2: this.cards })
        const res = await this.$axios.post('/api/cms/untuk-orangtua', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (res.status === 200) window.alert("berhasil mengubah kontent")
      } catch (e) {
        window.alert("gagal menyimpan konten")
      }
    },
    async saveTestimonyContent() {
      try {
        const payload = objectToFormData({ konten3: this.testimony
         })
        const res = await this.$axios.post('/api/cms/untuk-orangtua', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (res.status === 200) window.alert("berhasil mengubah kontent")
      } catch (e) {
        window.alert("gagal menyimpan konten")
      }
    },
  }
}
</script>
