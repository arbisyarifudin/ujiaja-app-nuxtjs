<template>
  <div v-if="isReady" class="col-md-12">
    <UIKonten>
      <template #title>Konten 1</template>
      <EditorContentMaster :original="originalMaster" :content="master" />
      <div class="col-md-12 pt-4">
        <button @click="saveMasterContent" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
    <UIKonten>
      <template #title>Konten 2</template>
      <div class="container-fluid">
        <div v-for="(content, i) in carousel" :key="i" class="row border-bottom">
          <div class="col-md-12">
            <EditorImage v-model="content.carousel" :max-size="5">
              <template #title>
                Carousel Slider
              </template>
              <template #warn>
                *Disarankan dengan Banner 1276 x 638 pixel, dan Maksimal 5 Mb
              </template>
            </EditorImage>
          </div>
          <div class="form-user col-md-12">
            <EditorText v-model="content.judul" :initial-value="originalCarousel[i].judul" placeholder="Isi Judul baru">
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="content.text" :initial-value="originalCarousel[i].text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
        </div>
        <div class="row py-2 border-bottom">
          <button @click="addCarousel" class="btn btn-outline-primary">+ Tambah Carousel Slider</button>
          <button @click="deleteCarousel" class="btn btn-outline-danger ml-3">- Hapus Carousel Slider</button>
        </div>
      </div>
      <div class="col-md-12 pt-4">
        <button @click="saveCarousel" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
    <UIKonten>
      <template #title>Konten 3</template>
      <div class="container-fluid">
        <div class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorText v-model="product.master.judul" placeholder="Isi Judul baru">
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="product.master.text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
        </div>
        <div v-for="(p, i) in product.products" :key="i" class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorText v-model="p.judul" placeholder="Isi Judul baru">
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorText v-model="p.subJudul" placeholder="Isi Judul baru">
              <template #title>Sub Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="p.text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12 pt-3">
            <EditorText v-model="p.tombol" placeholder="Isi nama tombol baru">
              <template #title>Tombol</template>
            </EditorText>
            <p class="pt-3">Link</p>
            <div class="form-group row justify-content-between px-3">
              <input v-model="p.link" placeholder="Isi Link yang ingin di tuju" class="form-control col-md-12" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 pt-4">
        <button @click="saveProduct" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
    <UIKonten>
      <template #title>Konten 4</template>
      <div class="container-fluid">
        <div class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorText v-model="product.master.judul" placeholder="Isi Judul baru">
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="product.master.text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
        </div>
        <div v-for="(f, i) in feature.features" :key="i" class="row border-bottom">
          <div class="col-md-12 pt-2">
            <EditorImage v-model="f.gambar" :max-size="5">
              <template #title>
                Gambar
              </template>
              <template #warn>
                *Disarankan dengan Banner 1276 x 638 pixel, dan Maksimal 5 Mb
              </template>
            </EditorImage>
          </div>
          <div class="form-user col-md-12">
            <EditorText v-model="f.judul" placeholder="Isi Judul baru">
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="f.text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12 pt-3">
            <EditorText v-model="f.tombol" placeholder="Isi nama tombol baru">
              <template #title>Tombol</template>
            </EditorText>
            <p class="pt-3">Link</p>
            <div class="form-group row justify-content-between px-3">
              <input v-model="f.link" placeholder="Isi Link yang ingin di tuju" class="form-control col-md-12" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 pt-4">
        <button @click="saveFeature" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
    <UIKonten>
      <template #title>Konten 5</template>
      <div class="container-fluid">
        <div class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorImage v-model="test.gambar" :max-size="5">
              <template #title>
                Gambar
              </template>
              <template #warn>
                *Disarankan dengan Banner 1276 x 638 pixel, dan Maksimal 5 Mb
              </template>
            </EditorImage>
          </div>
          <div class="form-user col-md-12">
            <EditorText v-model="test.judul" placeholder="Isi Judul baru">
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="test.text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12 pt-3">
            <EditorText v-model="test.tombol" placeholder="Isi nama tombol baru">
              <template #title>Tombol</template>
            </EditorText>
            <p class="pt-3">Link</p>
            <div class="form-group row justify-content-between px-3">
              <input v-model="test.link" placeholder="Isi Link yang ingin di tuju" class="form-control col-md-12" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 pt-4">
        <button @click="saveTest" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
    <UIKonten>
      <template #title>Konten 6</template>
      <div class="container-fluid">
        <div class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorText v-model="tryout.judul" placeholder="Isi Judul baru">
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="tryout.text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12">
            <EditorText v-model="tryout.subJudul" placeholder="Isi Judul baru">
              <template #title>Sub Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="tryout.subText">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12 pt-3">
            <EditorText v-model="tryout.tombol" placeholder="Isi nama tombol baru">
              <template #title>Tombol</template>
            </EditorText>
            <p class="pt-3">Link</p>
            <div class="form-group row justify-content-between px-3">
              <input v-model="tryout.link" placeholder="Isi Link yang ingin di tuju" class="form-control col-md-12" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 pt-4">
        <button @click="saveTryout" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
    <UIKonten>
      <template #title>Konten 7</template>
      <div class="container-fluid">
        <div class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorText v-model="degree.judul" placeholder="Isi Judul baru">
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="degree.text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12">
            <EditorImage v-model="degree.gambar" :max-size="5">
              <template #title>
                Gambar
              </template>
              <template #warn>
                *Disarankan dengan Banner 1276 x 638 pixel, dan Maksimal 5 Mb
              </template>
            </EditorImage>
          </div>
          <div class="form-user col-md-12">
            <EditorText v-model="degree.subJudul" placeholder="Isi Judul baru">
              <template #title>Sub Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="degree.subText">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12 pt-3">
            <EditorText v-model="degree.tombol" placeholder="Isi nama tombol baru">
              <template #title>Tombol</template>
            </EditorText>
            <p class="pt-3">Link</p>
            <div class="form-group row justify-content-between px-3">
              <input v-model="degree.link" placeholder="Isi Link yang ingin di tuju" class="form-control col-md-12" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 pt-4">
        <button @click="saveDegree" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
    <UIKonten>
      <template #title>Konten 8</template>
      <div class="container-fluid">
        <div class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorText v-model="review.master.judul" placeholder="Isi Judul baru">
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="review.master.text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
        </div>
        <div v-for="(r, i) in review.reviews" :key="i" class="row border-bottom">
          <div class="col-md-12 pt-2">
            <EditorImage v-model="r.gambar" :max-size="5">
              <template #title>
                Gambar
              </template>
              <template #warn>
                *Disarankan dengan Banner 1276 x 638 pixel, dan Maksimal 5 Mb
              </template>
            </EditorImage>
          </div>
          <div class="form-user col-md-12">
            <EditorText v-model="r.nama" placeholder="Isi Nama baru">
              <template #title>Nama</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorText v-model="r.jurusan" placeholder="Isi Jurusan baru">
              <template #title>Jurusan</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="r.text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
        </div>
        <div class="row py-2 border-bottom">
          <button @click="addReview" class="btn btn-outline-primary">+ Tambah Review</button>
          <button @click="deleteReview" class="btn btn-outline-danger ml-3">- Hapus Review</button>
        </div>
      </div>
      <div class="col-md-12 pt-4">
        <button @click="saveFeature" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
    <UIKonten>
      <template #title>Konten 9</template>
      <div class="container-fluid">
        <div class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorImage v-model="register.gambar" :max-size="5">
              <template #title>
                Gambar
              </template>
              <template #warn>
                *Disarankan dengan Banner 1276 x 638 pixel, dan Maksimal 5 Mb
              </template>
            </EditorImage>
          </div>
          <div class="form-user col-md-12">
            <EditorText v-model="register.judul" placeholder="Isi Judul baru">
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="register.text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12 pt-3">
            <EditorText v-model="register.tombol" placeholder="Isi nama tombol baru">
              <template #title>Tombol</template>
            </EditorText>
            <p class="pt-3">Link</p>
            <div class="form-group row justify-content-between px-3">
              <input v-model="register.link" placeholder="Isi Link yang ingin di tuju" class="form-control col-md-12" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 pt-4">
        <button @click="saveRegister" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
  </div>
</template>

<script>
import objectToFormData from '../../../helpers/object-to-form-data'

export default {
  data() {
    return {
      isReady: false,
      originalMaster: {
        id: '',
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
      master: {
        id: '',
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
      originalCarousel: [],
      carousel: [
        {
          id: '',
          gambar: null,
          judul: '',
          text: ''
        }
      ],
      product: {
        master: {
          id: '',
          judul: '',
          text: ''
        },
        products: [
          {
            id: '',
            judul: '',
            subJudul: '',
            text: '',
            tombol: '',
            link: ''
          },
          {
            id: '',
            judul: '',
            subJudul: '',
            text: '',
            tombol: '',
            link: ''
          }
        ]
      },
      feature: {
        master: {
          id: '',
          judul: '',
          text: ''
        },
        features: [
          {
            id: '',
            gambar: null,
            judul: '',
            text: '',
            tombol: '',
            link: ''
          },
          {
            id: '',
            gambar: null,
            judul: '',
            text: '',
            tombol: '',
            link: ''
          },
          {
            id: '',
            gambar: null,
            judul: '',
            text: '',
            tombol: '',
            link: ''
          },
        ]
      },
      test: {
        id: '',
        gambar: null,
        judul: '',
        text: '',
        tombol: '',
        link: ''
      },
      tryout: {
        id: '',
        judul: '',
        text: '',
        subJudul: '',
        subText: '',
        tombol: '',
        link: ''
      },
      degree: {
        id: '',
        judul: '',
        text: '',
        gambar: null,
        subJudul: '',
        subText: '',
        tombol: '',
        link: ''
      },
      review: {
        master: {
          id: '',
          judul: '',
          text: '',
        },
        reviews: [
          {
            id: '',
            gambar: null,
            nama: '',
            jurusan: '',
            text: ''
          },
        ]
      },
      register: {
        id: '',
        gambar: null,
        judul: '',
        text: '',
        tombol: '',
        link: ''
      },
    }
  },
  async mounted() {
    this.isReady = false
    const { data } = await this.$axios.get('/api/cms/halaman-utama/get')
    if (data.data instanceof Object) {
      const masterContent =  data.data.dataContent1[0]
      if (masterContent) {
        masterContent.sub_content = JSON.parse(masterContent.sub_content)
        this.originalMaster = masterContent
        this.master.id= masterContent.id
        this.master.banner = masterContent.banner
        this.master.gambar = masterContent.gambar
        this.master.sub_content = masterContent.sub_content.map(sc => ({
          text: '',
          link: sc.link
        }))
      }

      this.originalCarousel = data.data.dataContent2;
      this.carousel = data.data.dataContent2;
    }
    this.isReady = true
  },
  methods: {
    addCarousel() {
      this.carousel.push({
        id: '',
        image: null,
        judul: '',
        text: ''
      })
    },
    deleteCarousel() {
      if (this.carousel.length) this.carousel.pop()
    },
    addReview() {
      this.review.reviews.push({
        id: '',
        gambar: '',
        jurusan: '',
        text: ''
      })
    },
    deleteReview() {
      if (this.review.reviews.length) this.review.reviews.pop()
    },
    async saveMasterContent() {
      try {
        const payload = objectToFormData({ konten1: this.master })
        const res = await this.$axios.post('/api/cms/halaman-utama', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (res.status === 200) window.alert("berhasil mengubah konten")
      } catch (e) {
        window.alert("gagal menyimpan konten")
      }
    },
    async saveCarousel() {
      try {
        const payload = objectToFormData({ konten2: {data: this.carousel} })
        const res = await this.$axios.post('/api/cms/halaman-utama', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (res.status === 200) window.alert("berhasil mengubah konten")
      } catch (e) {
        window.alert("gagal menyimpan konten")
      }
    },
    async saveProduct() {
      try {
        const res = await this.$axios.post('/api/cms/halaman-utama', {
          konten3: this.product
        })
        if (res.status === 200) window.alert("berhasil menyimpan konten")
      } catch (e) {
        window.alert("gagal menyimpan konten")
      }
    },
    async saveFeature() {
      try {
        const payload = objectToFormData({ konten4: this.feature })
        const res = await this.$axios.post('/api/cms/halaman-utama', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (res.status === 200) window.alert("berhasil menyimpan konten")
      } catch (e) {
        window.alert("gagal menyimpan konten")
      }
    },
    async saveTest() {
      try {
        const payload = objectToFormData({ konten5: this.test })
        const res = await this.$axios.post('/api/cms/halaman-utama', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (res.status === 200) window.alert("berhasil menyimpan konten")
      } catch (e) {
        window.alert("gagal menyimpan konten")
      }
    },
    async saveTryout() {
      try {
        const res = await this.$axios.post('/api/cms/halaman-utama', {
          konten6: this.tryout
        })
        if (res.status === 200) window.alert("berhasil menyimpan konten")
      } catch (e) {
        window.alert("gagal menyimpan konten")
      }
    },
    async saveDegree() {
      try {
        const payload = objectToFormData({ konten7: this.degree })
        const res = await this.$axios.post('/api/cms/halaman-utama', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (res.status === 200) window.alert("berhasil menyimpan konten")
      } catch (e) {
        window.alert("gagal menyimpan konten")
      }
    },
    async saveReview() {
      try {
        const payload = objectToFormData({ konten8: this.review })
        const res = await this.$axios.post('/api/cms/halaman-utama', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (res.status === 200) window.alert("berhasil menyimpan konten")
      } catch (e) {
        window.alert("gagal menyimpan konten")
      }
    },
    async saveRegister() {
      try {
        const payload = objectToFormData({ konten9: this.register })
        const res = await this.$axios.post('/api/cms/halaman-utama', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (res.status === 200) window.alert("berhasil menyimpan konten")
      } catch (e) {
        window.alert("gagal menyimpan konten")
      }
    },
  }
}
</script>
