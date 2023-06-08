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
    <UIKonten>
      <template #title>Konten 4</template>
      <div class="container-fluid">
        <div class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorText
              v-model="content4Title.judul"
              :initial-value="originalContent4Title.judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea
              v-model="content4Title.text"
              :initial-value="originalContent4Title.text"
            >
              <template #title>Text</template>
            </EditorTextArea>
          </div>
        </div>
        <div
          class="row border-bottom"
          v-for="(ctn, indexCtn) in content4"
          :key="indexCtn"
        >
          <div class="form-user col-md-12">
            <EditorImage v-model="ctn.gambar" :max-size="5">
              <template #title> Gambar </template>
              <template #warn>
                *Disarankan dengan Gambar atau Vektor 1276 x 638 pixel, dan Maksimal 5 Mb
              </template>
            </EditorImage>
          </div>
          <div class="form-user col-md-12">
            <EditorText
              v-model="ctn.judul"
              :initial-value="originalContent4[indexCtn].judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorTextArea
              v-model="ctn.text"
              :initial-value="originalContent4[indexCtn].text"
            >
              <template #title>Text</template>
            </EditorTextArea>
          </div>
        </div>
      </div>
      <div class="col-md-12 pt-4">
        <button @click="saveContent4" class="btn btn-primary">Simpan</button>
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
      originalContent4Title: {
        id: "",
        id_content: 0,
        gambar: "",
        judul: "",
        text: "",
      },
      content4Title: {
        id: "",
        id_content: 0,
        gambar: "",
        judul: "",
        text: "",
      },
      originalContent4: [
        {
          id: "",
          id_content: 1,
          gambar: "",
          judul: "",
          text: "",
        },
        {
          id: "",
          id_content: 1,
          gambar: "",
          judul: "",
          text: "",
        },
      ],
      content4: [
        {
          id: "",
          id_content: 1,
          gambar: "",
          judul: "",
          text: "",
        },
        {
          id: "",
          id_content: 1,
          gambar: "",
          judul: "",
          text: "",
        },
      ],
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
    async saveContent4() {
      for (let i = 0; i < this.content4.length; i++) {
        if (typeof this.content4[i].gambar == "string") {
          this.content4[i].gambar = "";
        }
      }
      try {
        const payload = objectToFormData({
          konten4: { data: [...this.content4, this.content4Title] },
        });
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

        // Konten 4
        const master4 = data.data.dataContent4;
        if (master4.length > 0) {
          this.originalContent4 = master4;
          const title = master4.find((prod) => prod.id_content == 0);
          this.originalContent4Title = title;
          this.content4Title.id = title.id;
          this.content4Title.judul = title.judul;
          this.content4Title.text = title.text;

          for (let indexCtn = 0; indexCtn < master4.length; indexCtn++) {
            if (master4[indexCtn].id != title.id) {
              this.content4[indexCtn].id = master4[indexCtn].id;
              this.content4[indexCtn].id_content = master4[indexCtn].id_content;
              this.content4[indexCtn].judul = master4[indexCtn].judul;
              this.content4[indexCtn].text = master4[indexCtn].text;
              this.content4[indexCtn].gambar = master4[indexCtn].gambar;
            }
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
