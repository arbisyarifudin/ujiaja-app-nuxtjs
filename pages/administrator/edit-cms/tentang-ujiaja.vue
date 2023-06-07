<template>
  <div class="col-md-12">
    <UIKonten>
      <template #title>Konten 1</template>
      <div class="container-fluid">
        <div class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorImage v-model="master.gambar" :max-size="5">
              <template #title> Gambar </template>
              <template #warn>
                *Disarankan dengan Gambar atau Vektor 1276 x 638 pixel, dan Maksimal 5 Mb
              </template>
            </EditorImage>
          </div>
          <div class="form-user col-md-12">
            <EditorText
              v-model="master.judul"
              :initial-value="originalMaster.judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea v-model="master.text" :initial-value="originalMaster.text">
              <template #title>Text</template>
            </EditorTextArea>
          </div>
        </div>
      </div>
      <div class="col-md-12 pt-4">
        <button @click="saveMasterContent" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
    <UIKonten>
      <template #title>Konten 2</template>
      <div class="container-fluid">
        <div class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorText
              v-model="content2.judul"
              :initial-value="originalContent2.judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea
              v-model="content2.text"
              :initial-value="originalContent2.text"
            >
              <template #title>Text</template>
            </EditorTextArea>
          </div>
        </div>
      </div>
      <div class="col-md-12 pt-4">
        <button @click="saveContent2" class="btn btn-primary">Simpan</button>
      </div>
    </UIKonten>
  </div>
</template>

<script>
import objectToFormData from "../../../helpers/object-to-form-data";

export default {
  data() {
    return {
      originalMaster: {
        id: "",
        gambar: "",
        judul: "",
        text: "",
      },
      master: {
        id: "",
        gambar: "",
        judul: "",
        text: "",
      },
      originalContent2: {
        id: "",
        judul: "",
        text: "",
      },
      content2: {
        id: "",
        judul: "",
        text: "",
      },
    };
  },
  methods: {
    async saveMasterContent() {
      if (typeof this.master.gambar == "string") {
        this.master.gambar = "";
      }
      try {
        const payload = objectToFormData({ konten1: { data: [this.master] } });
        const res = await this.$axios.post("/api/cms/tentang-ujiaja", payload, {
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
    async saveContent2() {
      try {
        const payload = objectToFormData({ konten2: { data: [this.content2] } });
        const res = await this.$axios.post("/api/cms/tentang-ujiaja", payload, {
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
    async getMainPageData() {
      const { data } = await this.$axios.get("/api/cms/tentang-ujiaja/get");
      if (data.data instanceof Object) {
        // Konten 1
        const masterContent = data.data.dataContent1[0];
        if (data.data.dataContent1.length > 0) {
          this.originalMaster = masterContent;
          this.master.id = this.originalMaster.id;
          this.master.gambar = this.originalMaster.gambar;
          this.master.judul = this.originalMaster.judul;
          this.master.text = this.originalMaster.text;
        }

        // Konten 2
        const master2 = data.data.dataContent2[0];
        if (data.data.dataContent2.length > 0) {
          this.originalContent2 = master2;
          this.content2.id = this.originalContent2.id;
          this.content2.judul = this.originalContent2.judul;
          this.content2.text = this.originalContent2.text;
        }
      }
    },
  },
  async mounted() {
    await this.getMainPageData();
  },
};
</script>
