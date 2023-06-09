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
      <EditorContentCard
        v-for="(crsl, i) in carousel"
        :key="i"
        :content="crsl"
        :original="originalCarousel[i]"
      />
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
              v-model="konten3Title.judul"
              :initial-value="originalKonten3Title.judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea
              v-model="konten3Title.text"
              :initial-value="originalKonten3Title.text"
            >
              <template #title>Text</template>
            </EditorTextArea>
          </div>
        </div>
        <div v-for="(p, i) in konten3" :key="i" class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorText
              v-model="p.judul"
              :initial-value="originalKonten3[i].judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorText
              v-model="p.sub_judul"
              :initial-value="originalKonten3[i].sub_judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Sub Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="p.text" :initial-value="originalKonten3[i].text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12 pt-3">
            <EditorText
              v-model="p.tombol"
              :initial-value="originalKonten3[i].tombol"
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
        <button @click="saveKonten3" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
    <UIKonten>
      <template #title>Konten 4</template>
      <div class="container-fluid">
        <div class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorImage v-model="konten4.gambar" :max-size="5">
              <template #title> Gambar </template>
              <template #warn>
                *Disarankan dengan Banner 1276 x 638 pixel, dan Maksimal 5 Mb
              </template>
            </EditorImage>
          </div>
          <div class="form-user col-md-12">
            <EditorText
              v-model="konten4.judul"
              :initial-value="originalKonten4.judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="konten4.text" :initial-value="originalKonten4.text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12 pt-3">
            <EditorText
              v-model="konten4.tombol"
              :initial-value="originalKonten4.tombol"
              placeholder="Isi nama tombol baru"
            >
              <template #title>Tombol</template>
            </EditorText>
            <p class="pt-3">Link</p>
            <div class="form-group row justify-content-between px-3">
              <input
                v-model="konten4.link"
                placeholder="Isi Link yang ingin di tuju"
                class="form-control col-md-12"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 pt-4">
        <button @click="saveKonten4" class="btn btn-primary">Simpan</button>
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
          carousel: "",
          judul: "",
          text: "",
        },
        {
          id: "",
          carousel: "",
          judul: "",
          text: "",
        },
        {
          id: "",
          carousel: "",
          judul: "",
          text: "",
        },
      ],
      carousel: [
        {
          id: "",
          carousel: "",
          judul: "",
          text: "",
        },
        {
          id: "",
          carousel: "",
          judul: "",
          text: "",
        },
        {
          id: "",
          carousel: "",
          judul: "",
          text: "",
        },
      ],
      originalKonten3Title: {
        id: "",
        id_content: 0,
        judul: "",
        text: "",
      },
      konten3Title: {
        id: "",
        id_content: 0,
        judul: "",
        text: "",
      },
      originalKonten3: [
        {
          id: "",
          id_content: 1,
          judul: "",
          sub_judul: "",
          tombol: "",
          link: "",
          text: "",
        },
        {
          id: "",
          id_content: 1,
          judul: "",
          sub_judul: "",
          tombol: "",
          link: "",
          text: "",
        },
        {
          id: "",
          id_content: 1,
          judul: "",
          sub_judul: "",
          tombol: "",
          link: "",
          text: "",
        },
        {
          id: "",
          id_content: 1,
          judul: "",
          sub_judul: "",
          tombol: "",
          link: "",
          text: "",
        },
      ],
      konten3: [
        {
          id: "",
          id_content: 1,
          judul: "",
          sub_judul: "",
          tombol: "",
          link: "",
          text: "",
        },
        {
          id: "",
          id_content: 1,
          judul: "",
          sub_judul: "",
          tombol: "",
          link: "",
          text: "",
        },
        {
          id: "",
          id_content: 1,
          judul: "",
          sub_judul: "",
          tombol: "",
          link: "",
          text: "",
        },
        {
          id: "",
          id_content: 1,
          judul: "",
          sub_judul: "",
          tombol: "",
          link: "",
          text: "",
        },
      ],
      originalKonten4: {
        id: "",
        gambar: null,
        judul: "",
        text: "",
        tombol: "",
        link: "",
      },
      konten4: {
        id: "",
        gambar: null,
        judul: "",
        text: "",
        tombol: "",
        link: "",
      },
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
  methods: {
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
    async saveMasterContent() {
      if (typeof this.master[0].banner == "string") {
        this.master[0].banner = "";
      }
      if (typeof this.master[0].gambar == "string") {
        this.master[0].gambar = "";
      }
      try {
        const payload = objectToFormData({ konten1: { data: this.master } });
        const res = await this.$axios.post("/api/cms/tryout", payload, {
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
    async saveCarousel() {
      for (let i = 0; i < this.carousel.length; i++) {
        if (typeof this.carousel[i].carousel == "string") {
          this.carousel[i].carousel = "";
        }
      }
      try {
        const payload = objectToFormData({ konten2: { data: this.carousel } });
        const res = await this.$axios.post("/api/cms/tryout", payload, {
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
        const payload = objectToFormData({
          konten3: { data: [...this.konten3, this.konten3Title] },
        });
        const res = await this.$axios.post("/api/cms/tryout", payload);
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
    async saveKonten4() {
      try {
        const payload = objectToFormData({ konten5: this.konten4 });
        const res = await this.$axios.post("/api/cms/tryout", payload, {
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
    async saveReview() {
      try {
        const payload = objectToFormData({
          konten8: { data: [...this.review, this.reviewTitle] },
        });
        const res = await this.$axios.post("/api/cms/tryout", payload, {
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
    async saveRegister() {
      try {
        const payload = objectToFormData({ konten9: this.register });
        const res = await this.$axios.post("/api/cms/tryout", payload, {
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
      const { data } = await this.$axios.get("/api/cms/tryout/get");
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
        const masterCarousel = data.data.dataContent2;
        if (masterCarousel.length > 0) {
          this.originalCarousel = masterCarousel;
          for (let i = 0; i < masterCarousel.length; i++) {
            if (!this.carousel[i]) {
              this.carousel[i] = {};
            }
            this.carousel[i].id = masterCarousel[i].id;
            this.carousel[i].carousel = masterCarousel[i].carousel;
            this.carousel[i].judul = masterCarousel[i].judul;
            this.carousel[i].text = masterCarousel[i].text;
          }
        }

        // Konten 3
        let master3 = data.data.dataContent3;
        if (master3.length > 0) {
          const title = master3.find((rev) => rev.id_content == 0);
          this.originalKonten3 = title;
          this.konten3Title.id = title.id;
          this.konten3Title.judul = title.judul;
          this.konten3Title.text = title.text;
          master3.splice(
            master3.findIndex((rvw) => rvw.id == title.id),
            1
          );

          this.originalKonten3 = master3;

          for (let indexCtn = 0; indexCtn < master3.length; indexCtn++) {
            if (!this.konten3[indexCtn]) {
              this.konten3[indexCtn] = {};
            }
            this.konten3[indexCtn].id = master3[indexCtn].id;
            this.konten3[indexCtn].id_content = master3[indexCtn].id_content;
            this.konten3[indexCtn].judul = master3[indexCtn].judul;
            this.konten3[indexCtn].sub_judul = master3[indexCtn].sub_judul;
            this.konten3[indexCtn].text = master3[indexCtn].text;
            this.konten3[indexCtn].tombol = master3[indexCtn].tombol;
            this.konten3[indexCtn].link = master3[indexCtn].link;
          }
        }

        // Konten 4
        const master4 = data.data.dataContent5[0];
        if (data.data.dataContent5.length > 0) {
          this.originalKonten4 = master4;
          this.konten4.id = master4.id;
          this.konten4.judul = master4.judul;
          this.konten4.gambar = master4.gambar;
          this.konten4.text = master4.text;
          this.konten4.tombol = master4.tombol;
          this.konten4.link = master4.link;
        }

        // Konten 5
        let masterReview = data.data.dataContent8;
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
  async mounted() {
    await this.getMainPageData();
  },
};
</script>
