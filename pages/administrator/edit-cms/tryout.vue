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
      ],
      product: {
        master: {
          judul: '',
          text: ''
        },
        products: [
          {
            judul: '',
            subJudul: '',
            text: '',
            tombol: '',
            link: ''
          },
          {
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
          judul: '',
          text: ''
        },
        features: [
          {
            gambar: null,
            judul: '',
            text: '',
            tombol: '',
            link: ''
          },
          {
            gambar: null,
            judul: '',
            text: '',
            tombol: '',
            link: ''
          },
          {
            gambar: null,
            judul: '',
            text: '',
            tombol: '',
            link: ''
          },
        ]
      },
      test: {
        gambar: null,
        judul: '',
        text: '',
        tombol: '',
        link: ''
      },
      tryout: {
        judul: '',
        text: '',
        subJudul: '',
        subText: '',
        tombol: '',
        link: ''
      },
      degree: {
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
          judul: '',
          text: '',
        },
        reviews: [
          {
            gambar: null,
            nama: '',
            jurusan: '',
            text: ''
          },
        ]
      },
      register: {
        gambar: null,
        judul: '',
        text: '',
        tombol: '',
        link: ''
      },
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
    addReview() {
      this.review.reviews.push({
        gambar: '',
        jurusan: '',
        text: ''
      })
    },
    deleteReview() {
      if (this.review.reviews.length) this.review.reviews.pop()
    },
    deleteCardContent() {
      this.cards.pop()
    },
    saveProduct() {
      console.log(this.product)
    },
    saveFeature() {
      console.log(this.feature)
    },
    saveTest() {
      console.log(this.test)
    },
    saveTryout() {
      console.log(this.tryout)
    },
    saveDegree() {
      console.log(this.degree)
    },
    saveReview() {
      console.log(this.review)
    },
    saveRegister() {
      console.log(this.register)
    },
  }
}
</script>
