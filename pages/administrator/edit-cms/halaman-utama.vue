<template>
  <div v-if="isReady" class="col-md-12">
    <UIKonten>
      <template #title>Konten 1</template>
      <EditorContentMaster :original="originalMaster" :contents="master" />
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
              <template #title> Carousel Slider </template>
              <template #warn>
                *Disarankan dengan Banner 1276 x 638 pixel, dan Maksimal 5 Mb
              </template>
            </EditorImage>
          </div>
          <div class="form-user col-md-12">
            <EditorText
              v-model="content.judul"
              :initial-value="originalCarousel[i].judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea
              v-model="content.text"
              :initial-value="originalCarousel[i].text"
            >
              <template #title>Text</template>
            </EditorTextArea>
          </div>
        </div>
        <div class="row py-2 border-bottom">
          <button @click="addCarousel" class="btn btn-outline-primary">
            + Tambah Carousel Slider
          </button>
          <button @click="deleteCarousel" class="btn btn-outline-danger ml-3">
            - Hapus Carousel Slider
          </button>
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
            <EditorText
              v-model="productTitle.judul"
              :initial-value="originalProductTitle.judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="productTitle.text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
        </div>
        <div v-for="(p, i) in product" :key="i" class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorText
              v-model="p.judul"
              :initial-value="originalProduct[i].judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorText
              v-model="p.sub_judul"
              :initial-value="originalProduct[i].sub_judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Sub Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="p.text" :initial-value="originalProduct[i].text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12 pt-3">
            <EditorText
              v-model="p.tombol"
              :initial-value="originalProduct[i].tombol"
              placeholder="Isi nama tombol baru"
            >
              <template #title>Tombol</template>
            </EditorText>
            <p class="pt-3">Link</p>
            <div class="form-group row justify-content-between px-3">
              <input
                v-model="p.link"
                placeholder="Isi Link yang ingin di tuju"
                class="form-control col-md-12"
              />
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
        <!-- <div class="row border-bottom">
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
        </div> -->
        <div v-for="(f, i) in feature.features" :key="i" class="row border-bottom">
          <div class="col-md-12 pt-2">
            <EditorImage v-model="f.gambar" :max-size="5">
              <template #title> Gambar </template>
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
              <input
                v-model="f.link"
                placeholder="Isi Link yang ingin di tuju"
                class="form-control col-md-12"
              />
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
              <template #title> Gambar </template>
              <template #warn>
                *Disarankan dengan Banner 1276 x 638 pixel, dan Maksimal 5 Mb
              </template>
            </EditorImage>
          </div>
          <div class="form-user col-md-12">
            <EditorText
              v-model="test.judul"
              :initial-value="originalTest.judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="test.text" :initial-value="originalTest.text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12 pt-3">
            <EditorText
              v-model="test.tombol"
              :initial-value="originalTest.tombol"
              placeholder="Isi nama tombol baru"
            >
              <template #title>Tombol</template>
            </EditorText>
            <p class="pt-3">Link</p>
            <div class="form-group row justify-content-between px-3">
              <input
                v-model="test.link"
                :initial-value="originalTest.link"
                placeholder="Isi Link yang ingin di tuju"
                class="form-control col-md-12"
              />
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
            <EditorText
              v-model="tryout.judul"
              :initial-value="originalTryout.judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="tryout.text1" :initial-value="originalTryout.text1">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12">
            <EditorText
              v-model="tryout.sub_judul"
              :initial-value="originalTryout.sub_judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Sub Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="tryout.text2" :initial-value="originalTryout.text2">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12 pt-3">
            <EditorText
              v-model="tryout.tombol"
              :initial-value="originalTryout.tombol"
              placeholder="Isi nama tombol baru"
            >
              <template #title>Tombol</template>
            </EditorText>
            <p class="pt-3">Link</p>
            <div class="form-group row justify-content-between px-3">
              <input
                v-model="tryout.link"
                :initial-value="originalTryout.link"
                placeholder="Isi Link yang ingin di tuju"
                class="form-control col-md-12"
              />
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
            <EditorText
              v-model="degree.judul"
              :initial-value="originalDegree.judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="degree.text1" :initial-value="originalDegree.text1">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12">
            <EditorImage v-model="degree.gambar" :max-size="5">
              <template #title> Gambar </template>
              <template #warn>
                *Disarankan dengan Banner 1276 x 638 pixel, dan Maksimal 5 Mb
              </template>
            </EditorImage>
          </div>
          <div class="form-user col-md-12">
            <EditorText
              v-model="degree.sub_judul"
              :initial-value="originalDegree.sub_judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Sub Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="degree.text2" :initial-value="originalDegree.text2">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12 pt-3">
            <EditorText
              v-model="degree.tombol"
              :initial-value="originalDegree.tombol"
              placeholder="Isi nama tombol baru"
            >
              <template #title>Tombol</template>
            </EditorText>
            <p class="pt-3">Link</p>
            <div class="form-group row justify-content-between px-3">
              <input
                v-model="degree.link"
                :initial-value="originalDegree.link"
                placeholder="Isi Link yang ingin di tuju"
                class="form-control col-md-12"
              />
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
        <!-- <div class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorText v-model="review.master.judul" :initial-value="originalReview.master.judul"
              placeholder="Isi Judul baru">
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="review.master.text" :initial-value="originalReview.master.text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
        </div> -->
        <div v-for="(r, i) in review" :key="i" class="row border-bottom">
          <div class="col-md-12 pt-2">
            <EditorImage v-model="r.foto" :max-size="5">
              <template #title> Gambar </template>
              <template #warn>
                *Disarankan dengan Banner 1276 x 638 pixel, dan Maksimal 5 Mb
              </template>
            </EditorImage>
          </div>
          <div class="form-user col-md-12">
            <EditorText
              v-model="r.nama"
              :initial-value="originalReview[i].nama"
              placeholder="Isi Nama baru"
            >
              <template #title>Nama</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorText
              v-model="r.jurusan"
              :initial-value="originalReview[i].jurusan"
              placeholder="Isi Jurusan baru"
            >
              <template #title>Jurusan</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="r.text" :initial-value="originalReview[i].text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
        </div>
        <div class="row py-2 border-bottom">
          <button @click="addReview" class="btn btn-outline-primary">
            + Tambah Review
          </button>
          <button @click="deleteReview" class="btn btn-outline-danger ml-3">
            - Hapus Review
          </button>
        </div>
      </div>
      <div class="col-md-12 pt-4">
        <button @click="saveReview" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
    <UIKonten>
      <template #title>Konten 9</template>
      <div class="container-fluid">
        <div class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorImage v-model="register.gambar" :max-size="5">
              <template #title> Gambar </template>
              <template #warn>
                *Disarankan dengan Banner 1276 x 638 pixel, dan Maksimal 5 Mb
              </template>
            </EditorImage>
          </div>
          <div class="form-user col-md-12">
            <EditorText
              v-model="register.judul"
              :initial-value="originalRegister.judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea
              v-model="register.text"
              :initial-value="originalRegister.text"
            >
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12 pt-3">
            <EditorText
              v-model="register.tombol"
              :initial-value="originalRegister.tombol"
              placeholder="Isi nama tombol baru"
            >
              <template #title>Tombol</template>
            </EditorText>
            <p class="pt-3">Link</p>
            <div class="form-group row justify-content-between px-3">
              <input
                v-model="register.link"
                :initial-value="originalRegister.link"
                placeholder="Isi Link yang ingin di tuju"
                class="form-control col-md-12"
              />
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
import objectToFormData from "../../../helpers/object-to-form-data";

export default {
  data() {
    return {
      isReady: false,
      originalMaster: [
        {
          id: "",
          banner: "",
          gambar: "",
          judul: "",
          text: "",
          tombol: "",
          link: "",
        },
      ],
      master: [
        {
          id: "",
          banner: "",
          gambar: "",
          judul: "",
          text: "",
          tombol: "",
          link: "",
        },
      ],
      originalCarousel: [
        {
          id: "",
          judul: "",
          text: "",
        },
      ],
      carousel: [
        {
          id: "",
          judul: "",
          text: "",
        },
      ],
      originalProductTitle: {
        id: "",
        id_content: 0,
        judul: "",
        text: "",
      },
      productTitle: {
        id: "",
        id_content: 0,
        judul: "",
        text: "",
      },
      originalProduct: [
        {
          id: "",
          id_content: 1,
          judul: "",
          sub_judul: "",
          text: "",
          tombol: "",
          link: "",
        },
        {
          id: "",
          id_content: 1,
          judul: "",
          sub_judul: "",
          text: "",
          tombol: "",
          link: "",
        },
      ],
      product: [
        {
          id: '',
          id_content: 1,
          judul: "",
          sub_judul: "",
          text: "",
          tombol: "",
          link: "",
        },
        {
          id: '',
          id_content: 1,
          judul: "",
          sub_judul: "",
          text: "",
          tombol: "",
          link: "",
        },
      ],
      feature: {
        master: {
          id: "",
          judul: "",
          text: "",
        },
        features: [
          {
            id: "",
            gambar: null,
            judul: "",
            text: "",
            tombol: "",
            link: "",
          },
          {
            id: "",
            gambar: null,
            judul: "",
            text: "",
            tombol: "",
            link: "",
          },
          {
            id: "",
            gambar: null,
            judul: "",
            text: "",
            tombol: "",
            link: "",
          },
        ],
      },
      originalTest: {
        id: "",
        gambar: null,
        judul: "",
        text: "",
        tombol: "",
        link: "",
      },
      test: {
        id: "",
        gambar: null,
        judul: "",
        text: "",
        tombol: "",
        link: "",
      },
      originalTryout: {
        id: "",
        judul: "",
        text1: "",
        sub_judul: "",
        text2: "",
        tombol: "",
        link: "",
      },
      tryout: {
        id: "",
        judul: "",
        text1: "",
        sub_judul: "",
        text2: "",
        tombol: "",
        link: "",
      },
      originalDegree: {
        id: "",
        judul: "",
        text1: "",
        gambar: null,
        sub_judul: "",
        text2: "",
        tombol: "",
        link: "",
      },
      degree: {
        id: "",
        judul: "",
        text1: "",
        gambar: null,
        sub_judul: "",
        text2: "",
        tombol: "",
        link: "",
      },
      originalReview: [
        {
          id: "",
          id_content: "",
          foto: null,
          judul: "",
          nama: "",
          jurusan: "",
          text: "",
        },
      ],
      review: [
        {
          id: "",
          id_content: "0",
          foto: null,
          judul: "",
          nama: "",
          jurusan: "",
          text: "",
        },
      ],
      originalRegister: {
        id: "",
        gambar: null,
        judul: "",
        text: "",
        tombol: "",
        link: "",
      },
      register: {
        id: "",
        gambar: null,
        judul: "",
        text: "",
        tombol: "",
        link: "",
      },
    };
  },
  async mounted() {
    this.isReady = false;
    await this.getMainPageData();
    this.isReady = true;
  },
  methods: {
    addCarousel() {
      this.carousel.push({
        id: '',
        carousel: null,
        judul: "",
        text: "",
      });
      this.originalCarousel.push({
        judul: "",
        text: "",
      });
    },
    deleteCarousel() {
      if (this.carousel.length) this.carousel.pop();
    },
    addReview() {
      this.review.reviews.push({
        id: "",
        gambar: "",
        jurusan: "",
        text: "",
      });
    },
    deleteReview() {
      if (this.review.reviews.length) this.review.reviews.pop();
    },
    async saveMasterContent() {
      try {
        const payload = objectToFormData({ konten1: { data: this.master } });
        const res = await this.$axios.post("/api/cms/halaman-utama", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          this.getMainPageData();
          window.alert("Berhasil mengubah konten");
        }
      } catch (e) {
        window.alert("Gagal menyimpan konten");
      }
    },
    async saveCarousel() {
      for (let i = 0; i < this.carousel.length; i++) {
        if (typeof this.carousel[i].carousel == "string") {
          this.carousel[i].carousel = "";
        }
      }
      try {
        const payload = objectToFormData({ konten2: { data: this.carousel } });
        const res = await this.$axios.post("/api/cms/halaman-utama", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          this.getMainPageData();
          window.alert("Berhasil mengubah konten");
        }
      } catch (e) {
        window.alert("gagal menyimpan konten");
      }
    },
    async saveProduct() {
      try {
        const res = await this.$axios.post("/api/cms/halaman-utama", {
          konten3: { data: [...this.product, this.productTitle] },
        });
        if (res.data.success) {
          this.getMainPageData();
          window.alert("Berhasil mengubah konten");
        }
      } catch (e) {
        window.alert("gagal menyimpan konten");
      }
    },
    async saveFeature() {
      try {
        const payload = objectToFormData({ konten4: this.feature });
        const res = await this.$axios.post("/api/cms/halaman-utama", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          this.getMainPageData();
          window.alert("Berhasil mengubah konten");
        }
      } catch (e) {
        window.alert("gagal menyimpan konten");
      }
    },
    async saveTest() {
      try {
        const payload = objectToFormData({ konten5: this.test });
        const res = await this.$axios.post("/api/cms/halaman-utama", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          this.getMainPageData();
          window.alert("Berhasil mengubah konten");
        }
      } catch (e) {
        window.alert("gagal menyimpan konten");
      }
    },
    async saveTryout() {
      try {
        const res = await this.$axios.post("/api/cms/halaman-utama", {
          konten6: this.tryout,
        });
        if (res.data.success) {
          this.getMainPageData();
          window.alert("Berhasil mengubah konten");
        }
      } catch (e) {
        window.alert("gagal menyimpan konten");
      }
    },
    async saveDegree() {
      try {
        const payload = objectToFormData({ konten7: this.degree });
        const res = await this.$axios.post("/api/cms/halaman-utama", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          this.getMainPageData();
          window.alert("Berhasil mengubah konten");
        }
      } catch (e) {
        window.alert("gagal menyimpan konten");
      }
    },
    async saveReview() {
      try {
        const payload = objectToFormData({ konten8: { data: this.review } });
        const res = await this.$axios.post("/api/cms/halaman-utama", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          this.getMainPageData();
          window.alert("Berhasil mengubah konten");
        }
      } catch (e) {
        window.alert("gagal menyimpan konten");
      }
    },
    async saveRegister() {
      try {
        const payload = objectToFormData({ konten9: this.register });
        const res = await this.$axios.post("/api/cms/halaman-utama", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          this.getMainPageData();
          window.alert("Berhasil mengubah konten");
        }
      } catch (e) {
        window.alert("gagal menyimpan konten");
      }
    },
    async getMainPageData() {
      const { data } = await this.$axios.get("/api/cms/halaman-utama/get");
      if (data.data instanceof Object) {
        // Konten 1
        const masterContent = data.data.dataContent1;
        if (masterContent.length > 0) {
          this.originalMaster = masterContent;
          this.master = masterContent;
          for (let indexMaster = 0; indexMaster < masterContent.length; indexMaster++) {
            this.master[indexMaster].id = this.originalMaster[indexMaster].id;
            this.master[indexMaster].banner = this.originalMaster[indexMaster].banner;
            this.master[indexMaster].gambar = this.originalMaster[indexMaster].gambar;
            this.master[indexMaster].judul = this.originalMaster[indexMaster].judul;
            this.master[indexMaster].text = this.originalMaster[indexMaster].text;
            this.master[indexMaster].tombol = this.originalMaster[indexMaster].tombol;
            this.master[indexMaster].link = this.originalMaster[indexMaster].link;
          }
        }

        // Konten 2
        const masterCarousel = data.data.dataContent2;
        if (masterCarousel.length > 0) {
          this.originalCarousel = masterCarousel;
          for (let i = 0; i < masterCarousel.length; i++) {
            this.carousel[i].id = masterCarousel[i].id;
            this.carousel[i].carousel = masterCarousel[i].carousel;
            this.carousel[i].judul = masterCarousel[i].judul;
            this.carousel[i].text = masterCarousel[i].text;
          }
        }

        // Konten 3
        const masterProduct = data.data.dataContent3;
        if (masterProduct.length > 0) {
          this.originalProduct = masterProduct;
          const title = masterProduct.find((prod) => prod.id_content == 0);
          this.originalProductTitle = title;
          this.productTitle.id = title.id;
          this.productTitle.judul = title.judul;
          this.productTitle.text = title.text;

          for (let indexProd = 0; indexProd < masterProduct.length; indexProd++) {
            if (masterProduct[indexProd].id != title.id) {
              this.product[indexProd].id = masterProduct[indexProd].id;
              this.product[indexProd].id_content = masterProduct[indexProd].id_content;
              this.product[indexProd].judul = masterProduct[indexProd].judul;
              this.product[indexProd].sub_judul = masterProduct[indexProd].sub_judul;
              this.product[indexProd].text = masterProduct[indexProd].text;
              this.product[indexProd].tombol = masterProduct[indexProd].tombol;
              this.product[indexProd].link = masterProduct[indexProd].link;
            }
          }
        }

        // Konten 5
        const masterTest = data.data.dataContent5[0];
        if (data.data.dataContent5.length > 0) {
          this.originalTest = masterTest;
          this.test.id = masterTest.id;
          this.test.judul = masterTest.judul;
          this.test.gambar = masterTest.gambar;
          this.test.text = masterTest.text;
          this.test.tombol = masterTest.tombol;
          this.test.link = masterTest.link;
        }

        // Konten 6
        const masterTryout = data.data.dataContent6[0];
        if (data.data.dataContent6.length > 0) {
          this.originalTryout = masterTryout;
          this.tryout.id = masterTryout.id;
          this.tryout.judul = masterTryout.judul;
          this.tryout.text1 = masterTryout.text1;
          this.tryout.sub_judul = masterTryout.sub_judul;
          this.tryout.text2 = masterTryout.text2;
          this.tryout.tombol = masterTryout.tombol;
          this.tryout.link = masterTryout.link;
        }

        const masterDegree = data.data.dataContent7;
        if (masterDegree.length > 0) {
          this.originalDegree = masterDegree;
          this.degree = masterDegree;
        }

        // Konten 8
        const masterReview = data.data.dataContent8;
        if (masterReview.length > 0) {
          this.originalReview = masterReview;
          for (let indexRvw = 0; indexRvw < masterReview.length; indexRvw++) {
            this.review[indexRvw].id = masterReview[indexRvw].id;
            this.review[indexRvw].id_content = masterReview[indexRvw].id_content;
            this.review[indexRvw].foto = masterReview[indexRvw].foto;
            this.review[indexRvw].nama = masterReview[indexRvw].nama;
            this.review[indexRvw].jurusan = masterReview[indexRvw].jurusan;
            this.review[indexRvw].text = masterReview[indexRvw].text;
            this.review[indexRvw].judul = masterReview[indexRvw].judul;
          }
        }

        // Konten 9
        const masterRegister = data.data.dataContent9[0];
        if (data.data.dataContent9.length > 0) {
          this.originalRegister = masterRegister;
          this.register.id = masterRegister.id;
          this.register.gambar = masterRegister.gambar;
          this.register.judul = masterRegister.judul;
          this.register.text = masterRegister.text;
          this.register.tombol = masterRegister.tombol;
          this.register.link = masterRegister.link;
        }
      }
    },
  },
};
</script>
