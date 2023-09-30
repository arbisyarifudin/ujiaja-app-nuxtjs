<template>
  <div class="col-md-12">
    <UIKonten>
      <template #title>Konten 1</template>
      <EditorContentMaster
        :original="originalMaster"
        :contents="master"
        :can-add="false"
      />
      <div class="col-md-12 pt-4">
        <button @click="saveMasterContent" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
    <UIKonten>
      <template #title>Konten 2</template>
      <div class="row border-bottom">
        <div class="form-user col-md-12">
          <EditorText
            v-model="carouselTitle.judul"
            :initial-value="originalCarouselTitle.judul"
            placeholder="Isi Judul baru"
          >
            <template #title>Judul</template>
          </EditorText>
        </div>
        <div class="form-user col-md-12">
          <EditorTextArea
            v-model="carouselTitle.text"
            :initial-value="originalCarouselTitle.text"
          >
            <template #title>Text</template>
          </EditorTextArea>
        </div>
      </div>
      <EditorContentCard
        v-for="(card, i) in carousel"
        :key="i"
        :content="card"
        :original="originalCarousel[i]"
      />
      <div class="col-md-12 pt-4">
        <button @click="saveCardContent" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
    <UIKonten>
      <template #title>Konten 3</template>
      <div class="container-fluid">
        <div class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorImage v-model="konten3.gambar" :max-size="5">
              <template #title> Gambar </template>
              <template #warn>
                *Disarankan dengan Banner 1276 x 638 pixel, dan Maksimal 5 Mb
              </template>
            </EditorImage>
          </div>
          <div class="form-user col-md-12">
            <EditorText
              v-model="konten3.judul"
              :initial-value="originalKonten3.judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="konten3.text" :initial-value="originalKonten3.text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12 pt-3">
            <EditorText
              v-model="konten3.tombol"
              :initial-value="originalKonten3.tombol"
              placeholder="Isi nama tombol baru"
            >
              <template #title>Tombol</template>
            </EditorText>
            <p class="pt-3">Link</p>
            <div class="form-group row justify-content-between px-3">
              <input
                v-model="konten3.link"
                placeholder="Isi Link yang ingin di tuju"
                class="form-control col-md-12"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 pt-4">
        <button @click="saveKonten3" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
    <UIKonten>
      <template #title>Konten 4</template>
      <div class="container-fluid">
        <div
          class="row border-bottom"
          v-for="(langkah, indexLangkah) in konten4"
          :key="indexLangkah"
        >
          <div class="form-user col-md-12">
            <EditorText
              v-model="langkah.judul"
              :initial-value="originalLangkah[indexLangkah].judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea
              v-model="langkah.text"
              :initial-value="originalLangkah[indexLangkah].text"
            >
              <template #title>Text</template>
            </EditorTextArea>
          </div>
        </div>
      </div>
      <div class="col-md-12 pt-4">
        <button @click="saveLangkah" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
    <UIKonten>
      <template #title>Konten 5</template>
      <div class="container-fluid">
        <div class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorText
              v-model="reviewTitle.judul"
              :initial-value="originalReviewTitle.judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea
              v-model="reviewTitle.text"
              :initial-value="originalReviewTitle.text"
            >
              <template #title>Text</template>
            </EditorTextArea>
          </div>
        </div>
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
      <template #title>Konten 6</template>
      <div class="container-fluid">
        <div class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorImage v-model="konten6.gambar" :max-size="5">
              <template #title> Gambar </template>
              <template #warn>
                *Disarankan dengan Banner 1276 x 638 pixel, dan Maksimal 5 Mb
              </template>
            </EditorImage>
          </div>
          <div class="form-user col-md-12">
            <EditorText
              v-model="konten6.judul"
              :initial-value="originalKonten6.judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="konten6.text" :initial-value="originalKonten6.text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12 pt-3">
            <EditorText
              v-model="konten6.tombol"
              :initial-value="originalKonten6.tombol"
              placeholder="Isi nama tombol baru"
            >
              <template #title>Tombol</template>
            </EditorText>
            <p class="pt-3">Link</p>
            <div class="form-group row justify-content-between px-3">
              <input
                v-model="konten6.link"
                placeholder="Isi Link yang ingin di tuju"
                class="form-control col-md-12"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 pt-4">
        <button @click="saveKonten6" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
  </div>
</template>

<script>
import objectToFormData from "../../../helpers/object-to-form-data";

export default {
  data() {
    return {
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
      originalCarouselTitle: {
        id: "",
        id_content: 0,
        judul: "",
        text: "",
      },
      carouselTitle: {
        id: "",
        id_content: 0,
        judul: "",
        text: "",
      },
      originalCarousel: [
        {
          id: "",
          id_content: 0,
          judul: "",
          text: "",
        },
        {
          id: "",
          id_content: 0,
          judul: "",
          text: "",
        },
        {
          id: "",
          id_content: 0,
          judul: "",
          text: "",
        },
      ],
      carousel: [
        {
          id: "",
          id_content: 1,
          card: "",
          judul: "",
          text: "",
        },
        {
          id: "",
          id_content: 1,
          card: "",
          judul: "",
          text: "",
        },
        {
          id: "",
          id_content: 1,
          card: "",
          judul: "",
          text: "",
        },
      ],
      originalKonten3: {
        id: "",
        gambar: null,
        judul: "",
        text: "",
        tombol: "",
        link: "",
      },
      konten3: {
        id: "",
        gambar: null,
        judul: "",
        text: "",
        tombol: "",
        link: "",
      },
      originalLangkah: [
        {
          id: "",
          id_content: 1,
          judul: "",
          text: "",
        },
        {
          id: "",
          id_content: 1,
          judul: "",
          text: "",
        },
        {
          id: "",
          id_content: 1,
          judul: "",
          text: "",
        },
      ],
      konten4: [
        {
          id: "",
          id_content: 1,
          judul: "",
          text: "",
        },
        {
          id: "",
          id_content: 1,
          judul: "",
          text: "",
        },
        {
          id: "",
          id_content: 1,
          judul: "",
          text: "",
        },
      ],
      originalReviewTitle: {
        id: "",
        id_content: 0,
        judul: "",
        text: "",
      },
      reviewTitle: {
        id: "",
        id_content: 0,
        judul: "",
        text: "",
      },
      originalReview: [
        {
          id: "",
          id_content: 1,
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
          id_content: 1,
          foto: null,
          judul: "",
          nama: "",
          jurusan: "",
          text: "",
        },
      ],
      originalKonten6: {
        id: "",
        gambar: null,
        judul: "",
        text: "",
        tombol: "",
        link: "",
      },
      konten6: {
        id: "",
        gambar: null,
        judul: "",
        text: "",
        tombol: "",
        link: "",
      },
    };
  },
  methods: {
    async saveMasterContent() {
      if (typeof this.master[0].banner == "string") {
        this.master[0].banner = "";
      }
      if (typeof this.master[0].gambar == "string") {
        this.master[0].gambar = "";
      }
      try {
        const payload = objectToFormData({ konten1: { data: this.master } });
        const res = await this.$axios.post("/api/cms/tutor", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          this.getMainPageData();
          this.$bvToast.toast("Berhasil mengubah konten", {
            title: "Sukses",
            variant: "success",
            solid: true,
            autoHideDelay: 3000,
          });
        }
      } catch (e) {
        console.log(e);
        this.$bvToast.toast("Gagal menyimpan konten", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000,
        });
      }
    },
    async saveCardContent() {
      for (let i = 0; i < this.carousel.length; i++) {
        if (typeof this.carousel[i].carousel == "string") {
          this.carousel[i].carousel = "";
        }
        this.carousel[i].card = this.carousel[i].carousel;
      }
      try {
        const payload = objectToFormData({ konten2: { data: [...this.carousel, this.carouselTitle] } });
        const res = await this.$axios.post("/api/cms/tutor", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          this.getMainPageData();
          this.$bvToast.toast("Berhasil mengubah konten", {
            title: "Sukses",
            variant: "success",
            solid: true,
            autoHideDelay: 3000,
          });
        }
      } catch (e) {
        this.$bvToast.toast("Gagal menyimpan konten", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000,
        });
      }
    },
    async saveKonten3() {
      try {
        const payload = objectToFormData({ konten3: this.konten3 });
        const res = await this.$axios.post("/api/cms/tutor", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          this.getMainPageData();
          this.$bvToast.toast("Berhasil mengubah konten", {
            title: "Sukses",
            variant: "success",
            solid: true,
            autoHideDelay: 3000,
          });
        }
      } catch (e) {
        this.$bvToast.toast("Gagal menyimpan konten", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000,
        });
      }
    },
    async saveLangkah() {
      try {
        const payload = objectToFormData({ konten4: { data: this.konten4 } });
        const res = await this.$axios.post("/api/cms/tutor", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          this.getMainPageData();
          this.$bvToast.toast("Berhasil mengubah konten", {
            title: "Sukses",
            variant: "success",
            solid: true,
            autoHideDelay: 3000,
          });
        }
      } catch (e) {
        console.log(e);
        this.$bvToast.toast("Gagal menyimpan konten", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000,
        });
      }
    },
    addReview() {
      this.review.push({
        id: "",
        id_content: 1,
        foto: "",
        judul: "",
        nama: "",
        jurusan: "",
        text: "",
      });
      this.originalReview.push({
        id: "",
        id_content: 1,
        foto: "",
        judul: "",
        nama: "",
        jurusan: "",
        text: "",
      });
    },
    async saveReview() {
      try {
        const payload = objectToFormData({
          konten5: { data: [...this.review, this.reviewTitle] },
        });
        const res = await this.$axios.post("/api/cms/tutor", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          this.getMainPageData();
          this.$bvToast.toast("Berhasil mengubah konten", {
            title: "Sukses",
            variant: "success",
            solid: true,
            autoHideDelay: 3000,
          });
        }
      } catch (e) {
        this.$bvToast.toast("Gagal menyimpan konten", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000,
        });
      }
    },
    async deleteReview() {
      try {
        const lastData = this.review[this.review.length - 1];
        if (lastData.id == "") {
          this.review.pop();
          return false;
        }
        const res = await this.$axios.post(
          `/api/cms/tutor/delete-content8/${lastData.id}`,
          {}
        );
        if (res.data.success) {
          this.review.pop();
          this.getMainPageData();
          this.$bvToast.toast("Berhasil menghapus konten", {
            title: "Sukses",
            variant: "success",
            solid: true,
            autoHideDelay: 3000,
          });
        }
      } catch (e) {
        this.$bvToast.toast("Gagal menghapus konten", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000,
        });
      }
    },
    async saveKonten6() {
      try {
        const payload = objectToFormData({ konten6: this.konten6 });
        const res = await this.$axios.post("/api/cms/tutor", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          this.getMainPageData();
          this.$bvToast.toast("Berhasil mengubah konten", {
            title: "Sukses",
            variant: "success",
            solid: true,
            autoHideDelay: 3000,
          });
        }
      } catch (e) {
        this.$bvToast.toast("Gagal menyimpan konten", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000,
        });
      }
    },
    async getMainPageData() {
      const { data } = await this.$axios.get("/api/cms/tutor/get");
      if (data.data instanceof Object) {
        // Konten 1
        const masterContent = data.data.dataContent1;
        if (masterContent.length > 0) {
          this.originalMaster = masterContent;
          this.master[0].id = this.originalMaster[0].id;
          this.master[0].banner = this.originalMaster[0].banner;
          this.master[0].gambar = this.originalMaster[0].gambar;
          this.master[0].judul = this.originalMaster[0].judul;
          this.master[0].text = this.originalMaster[0].text;
          this.master[0].tombol = this.originalMaster[0].tombol;
          this.master[0].link = this.originalMaster[0].link;
        }

        // Konten 2
        let masterCarousel = data.data.dataContent2;
        if (masterCarousel.length > 0) {
          const title = masterCarousel.find((rev) => rev.id_content == 0);
          this.originalCarouselTitle = title;
          this.carouselTitle.id = title.id;
          this.carouselTitle.judul = title.judul;
          this.carouselTitle.text = title.text;
          masterCarousel.splice(
            masterCarousel.findIndex((crsl) => crsl.id == title.id),
            1
          );

          this.originalCarousel = masterCarousel;
          for (let i = 0; i < masterCarousel.length; i++) {
            if (!this.carousel[i]) {
              this.carousel[i] = {};
            }
            this.carousel[i].id = masterCarousel[i].id;
            this.carousel[i].carousel = masterCarousel[i].card;
            this.carousel[i].judul = masterCarousel[i].judul;
            this.carousel[i].text = masterCarousel[i].text;
          }
        }

        // Konten 3
        const master3 = data.data.dataContent3[0];
        if (data.data.dataContent3.length > 0) {
          this.originalKonten3 = master3;
          this.konten3.id = master3.id;
          this.konten3.judul = master3.judul;
          this.konten3.gambar = master3.gambar;
          this.konten3.text = master3.text;
          this.konten3.tombol = master3.tombol;
          this.konten3.link = master3.link;
        }

        // Konten 4
        const master4 = data.data.dataContent4;
        if (masterCarousel.length > 0) {
          this.originalLangkah = master4;
          for (let i = 0; i < master4.length; i++) {
            this.konten4[i].id = master4[i].id;
            this.konten4[i].id_content = master4[i].id_content;
            this.konten4[i].judul = master4[i].judul;
            this.konten4[i].text = master4[i].text;
          }
        }

        // Konten 5
        let masterReview = data.data.dataContent5;
        if (masterReview.length > 0) {
          const title = masterReview.find((rev) => rev.id_content == 0);
          this.originalReviewTitle = title;
          this.reviewTitle.id = title.id;
          this.reviewTitle.judul = title.judul;
          this.reviewTitle.text = title.text;
          masterReview.splice(
            masterReview.findIndex((rvw) => rvw.id == title.id),
            1
          );

          this.originalReview = masterReview;

          for (let indexRvw = 0; indexRvw < masterReview.length; indexRvw++) {
            if (!this.review[indexRvw]) {
              this.review[indexRvw] = {};
            }
            this.review[indexRvw].id = masterReview[indexRvw].id;
            this.review[indexRvw].id_content = masterReview[indexRvw].id_content;
            this.review[indexRvw].foto = masterReview[indexRvw].foto;
            this.review[indexRvw].nama = masterReview[indexRvw].nama;
            this.review[indexRvw].jurusan = masterReview[indexRvw].jurusan;
            this.review[indexRvw].text = masterReview[indexRvw].text;
            this.review[indexRvw].judul = masterReview[indexRvw].judul;
          }
        }

        // Konten 6
        const master6 = data.data.dataContent6[0];
        if (data.data.dataContent6.length > 0) {
          this.originalKonten6 = master6;
          this.konten6.id = master6.id;
          this.konten6.judul = master6.judul;
          this.konten6.gambar = master6.gambar;
          this.konten6.text = master6.text;
          this.konten6.tombol = master6.tombol;
          this.konten6.link = master6.link;
        }
      }
    },
  },
  async mounted() {
    await this.getMainPageData();
  },
};
</script>
