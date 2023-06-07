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
        <div
          class="row border-bottom"
          v-for="(langkah, indexLangkah) in content3"
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
      <template #title>Konten 4</template>
      <div class="container-fluid">
        <div class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorImage v-model="content4.gambar" :max-size="5">
              <template #title> Gambar </template>
              <template #warn>
                *Disarankan dengan Banner 1276 x 638 pixel, dan Maksimal 5 Mb
              </template>
            </EditorImage>
          </div>
          <div class="form-user col-md-12">
            <EditorText
              v-model="content4.judul"
              :initial-value="originalContent4.judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea
              v-model="content4.text"
              :initial-value="originalContent4.text"
            >
              <template #title>Text</template>
            </EditorTextArea>
          </div>
          <div class="form-user col-md-12 pt-3">
            <EditorText
              v-model="content4.tombol"
              :initial-value="originalContent4.tombol"
              placeholder="Isi nama tombol baru"
            >
              <template #title>Tombol</template>
            </EditorText>
            <p class="pt-3">Link</p>
            <div class="form-group row justify-content-between px-3">
              <input
                v-model="content4.link"
                :initial-value="originalContent4.link"
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
      content3: [
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
      originalContent4: {
        id: "",
        id_content: 0,
        gambar: null,
        judul: "",
        text: "",
        tombol: "",
        link: "",
      },
      content4: {
        id: "",
        id_content: 0,
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
        const res = await this.$axios.post("/api/cms/les-privat", payload, {
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
        const res = await this.$axios.post("/api/cms/les-privat", payload, {
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
        const payload = objectToFormData({ konten3: { data: this.content3 } });
        const res = await this.$axios.post("/api/cms/les-privat", payload, {
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
    async saveKonten4() {
      try {
        const payload = objectToFormData({ konten4: { data: [this.content4] } });
        const res = await this.$axios.post("/api/cms/les-privat", payload, {
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
      const { data } = await this.$axios.get("/api/cms/les-privat/get");
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
        const master3 = data.data.dataContent2;
        if (masterCarousel.length > 0) {
          this.originalLangkah = master3;
          for (let i = 0; i < master3.length; i++) {
            this.content3[i].id = master3[i].id;
            this.content3[i].id_content = master3[i].id_content;
            this.content3[i].judul = master3[i].judul;
            this.content3[i].text = master3[i].text;
          }
        }

        // Konten 4
        const master4 = data.data.dataContent4[0];
        if (data.data.dataContent4.length > 0) {
          this.originalContent4 = master4;
          this.content4.id = master4.id;
          this.content4.judul = master4.judul;
          this.content4.gambar = master4.gambar;
          this.content4.text = master4.text;
          this.content4.tombol = master4.tombol;
          this.content4.link = master4.link;
        }
      }
    },
  },
};
</script>
