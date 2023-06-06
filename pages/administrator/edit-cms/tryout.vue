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
        <button @click="saveMasterContent" class="btn btn-primary">
          Simpan
        </button>
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
            <EditorTextArea
              v-model="p.text"
              :initial-value="originalKonten3[i].text"
            >
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
            <EditorTextArea
              v-model="konten4.text"
              :initial-value="originalKonten4.text"
            >
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
            <EditorText
              v-model="tryout.tombol"
              placeholder="Isi nama tombol baru"
            >
              <template #title>Tombol</template>
            </EditorText>
            <p class="pt-3">Link</p>
            <div class="form-group row justify-content-between px-3">
              <input
                v-model="tryout.link"
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
              <template #title> Gambar </template>
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
            <EditorText
              v-model="degree.tombol"
              placeholder="Isi nama tombol baru"
            >
              <template #title>Tombol</template>
            </EditorText>
            <p class="pt-3">Link</p>
            <div class="form-group row justify-content-between px-3">
              <input
                v-model="degree.link"
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
        <div class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorText
              v-model="review.master.judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="review.master.text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
        </div>
        <div
          v-for="(r, i) in review.reviews"
          :key="i"
          class="row border-bottom"
        >
          <div class="col-md-12 pt-2">
            <EditorImage v-model="r.gambar" :max-size="5">
              <template #title> Gambar </template>
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
          <button @click="addReview" class="btn btn-outline-primary">
            + Tambah Review
          </button>
          <button @click="deleteReview" class="btn btn-outline-danger ml-3">
            - Hapus Review
          </button>
        </div>
      </div>
      <div class="col-md-12 pt-4">
        <button class="btn btn-primary">Simpan</button>
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
            <EditorText
              v-model="register.tombol"
              placeholder="Isi nama tombol baru"
            >
              <template #title>Tombol</template>
            </EditorText>
            <p class="pt-3">Link</p>
            <div class="form-group row justify-content-between px-3">
              <input
                v-model="register.link"
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
      product: {
        master: {
          judul: "",
          text: "",
        },
        products: [
          {
            judul: "",
            subJudul: "",
            text: "",
            tombol: "",
            link: "",
          },
          {
            judul: "",
            subJudul: "",
            text: "",
            tombol: "",
            link: "",
          },
        ],
      },
      feature: {
        master: {
          judul: "",
          text: "",
        },
        features: [
          {
            gambar: null,
            judul: "",
            text: "",
            tombol: "",
            link: "",
          },
          {
            gambar: null,
            judul: "",
            text: "",
            tombol: "",
            link: "",
          },
          {
            gambar: null,
            judul: "",
            text: "",
            tombol: "",
            link: "",
          },
        ],
      },
      test: {
        gambar: null,
        judul: "",
        text: "",
        tombol: "",
        link: "",
      },
      tryout: {
        judul: "",
        text: "",
        subJudul: "",
        subText: "",
        tombol: "",
        link: "",
      },
      degree: {
        judul: "",
        text: "",
        gambar: null,
        subJudul: "",
        subText: "",
        tombol: "",
        link: "",
      },
      review: {
        master: {
          judul: "",
          text: "",
        },
        reviews: [
          {
            gambar: null,
            nama: "",
            jurusan: "",
            text: "",
          },
        ],
      },
      register: {
        gambar: null,
        judul: "",
        text: "",
        tombol: "",
        link: "",
      },
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
    addReview() {
      this.review.reviews.push({
        gambar: "",
        jurusan: "",
        text: "",
      });
    },
    deleteReview() {
      if (this.review.reviews.length) this.review.reviews.pop();
    },
    deleteCardContent() {
      this.cards.pop();
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
    async saveTryout() {
      try {
        const res = await this.$axios.post("/api/cms/tryout", {
          konten6: this.tryout,
        });
        if (res.status === 200) window.alert("berhasil menyimpan konten");
      } catch (e) {
        window.alert("gagal menyimpan konten");
      }
    },
    async saveDegree() {
      try {
        const payload = objectToFormData({ konten7: this.degree });
        const res = await this.$axios.post("/api/cms/tryout", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.status === 200) window.alert("berhasil menyimpan konten");
      } catch (e) {
        window.alert("gagal menyimpan konten");
      }
    },
    async saveReview() {
      try {
        const payload = objectToFormData({ konten8: this.review });
        const res = await this.$axios.post("/api/cms/tryout", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.status === 200) window.alert("berhasil menyimpan konten");
      } catch (e) {
        window.alert("gagal menyimpan konten");
      }
    },
    async saveRegister() {
      try {
        const payload = objectToFormData({ konten9: this.register });
        const res = await this.$axios.post("/api/cms/tryout", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.status === 200) window.alert("berhasil menyimpan konten");
      } catch (e) {
        window.alert("gagal menyimpan konten");
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
      }
    },
  },
  async mounted() {
    await this.getMainPageData();
  },
};
</script>
