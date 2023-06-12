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
        :is-last="carousel.length == 1"
        :can-add="true"
        @add="addCardContent"
        @delete="deleteCardContent"
      />
      <div class="col-md-12 pt-4">
        <button @click="saveCardContent" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
    <UIKonten>
      <template #title>Konten 3</template>
      <div class="container-fluid">
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
          <div class="form-user col-md-12 pt-3">
            <EditorText
              v-model="r.tombol"
              :initial-value="originalReview[i].tombol"
              placeholder="Isi nama tombol baru"
            >
              <template #title>Tombol</template>
            </EditorText>
            <p class="pt-3">Link</p>
            <div class="form-group row justify-content-between px-3">
              <input
                v-model="r.link"
                placeholder="Isi Link yang ingin di tuju"
                class="form-control col-md-12"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 pt-4">
        <button @click="saveReview" class="btn btn-primary">Simpan</button>
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
          carousel: "",
          judul: "",
          text: "",
          posisi: "",
        },
      ],
      carousel: [
        {
          id: "",
          id_content: 1,
          carousel: "",
          judul: "",
          text: "",
          posisi: "",
        },
      ],
      originalReview: [
        {
          id: "",
          foto: null,
          judul: "-",
          nama: "",
          jurusan: "",
          text: "",
          tombol: '',
          link: ''
        },
      ],
      review: [
        {
          id: "",
          foto: null,
          judul: "-",
          nama: "",
          jurusan: "",
          text: "",
          tombol: '',
          link: ''
        },
      ],
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
        const res = await this.$axios.post("/api/cms/orang-tua", payload, {
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
        const payload = objectToFormData({
          konten2: { data: [...this.carousel, this.carouselTitle] },
        });
        const res = await this.$axios.post("/api/cms/orang-tua", payload, {
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
    addCardContent() {
      this.carousel.push({
        id: "",
        id_content: 1,
        carousel: "",
        judul: "",
        text: "",
        posisi: "",
      });
      this.originalCarousel.push({
        id: "",
        id_content: 1,
        carousel: "",
        judul: "",
        text: "",
        posisi: "",
      });
    },
    async deleteCardContent() {
      try {
        const lastData = this.carousel[this.carousel.length - 1];
        if (lastData.id == "") {
          this.carousel.pop();
          return false;
        }
        const res = await this.$axios.post(
          `/api/cms/orang-tua/delete-content2/${lastData.id}`,
          {}
        );
        if (res.data.success) {
          this.carousel.pop();
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
    async saveReview() {
      try {
        const payload = objectToFormData({
          konten3: { data: this.review },
        });
        const res = await this.$axios.post("/api/cms/orang-tua", payload, {
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
      const { data } = await this.$axios.get("/api/cms/orang-tua/get");
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
          this.reviewCarousel.id = title.id;
          this.reviewCarousel.judul = title.judul;
          this.reviewCarousel.text = title.text;
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
            this.carousel[i].posisi = masterCarousel[i].posisi;
          }
        }

        // Konten 3
        let masterReview = data.data.dataContent3;
        if (masterReview.length > 0) {
          this.originalReview = masterReview;

          for (let indexRvw = 0; indexRvw < masterReview.length; indexRvw++) {
            if (!this.review[indexRvw]) {
              this.review[indexRvw] = {};
            }
            this.review[indexRvw].id = masterReview[indexRvw].id;
            this.review[indexRvw].foto = masterReview[indexRvw].foto;
            this.review[indexRvw].nama = masterReview[indexRvw].nama;
            this.review[indexRvw].jurusan = masterReview[indexRvw].jurusan;
            this.review[indexRvw].text = masterReview[indexRvw].text;
            this.review[indexRvw].judul = masterReview[indexRvw].judul;
            this.review[indexRvw].tombol = masterReview[indexRvw].tombol;
            this.review[indexRvw].link = masterReview[indexRvw].link;
          }
        }
      }
    },
  },
  async mounted() {
    await this.getMainPageData();
  },
};
</script>
