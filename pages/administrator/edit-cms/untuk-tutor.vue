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
      <EditorContentCard v-for="(card, i) in cards" :key="i" :content="card" />
      <div class="col-md-12 pt-3 mt-1 row">
        <button @click="addCardContent" class="btn btn-outline-primary">
          + Tambah Sub Konten
        </button>
        <button @click="deleteCardContent" class="btn btn-outline-danger ml-3">
          Hapus Sub Konten
        </button>
      </div>
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
      cards: [
        {
          judul: "",
          card: null,
          posisiGambar: null,
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
    saveCardContent() {
      console.log(this.cards);
    },
    addCardContent() {
      this.cards.push({
        judul: "",
        card: null,
        posisiGambar: null,
      });
    },
    deleteCardContent() {
      this.cards.pop();
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
      }
    },
  },
};
</script>
