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
          }
        }
      }
    },
  },
};
</script>
