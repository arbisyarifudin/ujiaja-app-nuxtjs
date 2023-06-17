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
      <template #title>Konten 3</template>
      <div class="container-fluid">
        <div class="row border-bottom mb-4" v-for="(ctn, indexCtn) in content3" :key="indexCtn">
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
              :initial-value="originalContent3[indexCtn].judul"
              placeholder="Isi Judul baru"
            >
              <template #title>Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorText
              v-model="ctn.sub_judul"
              :initial-value="originalContent3[indexCtn].sub_judul"
              placeholder="Isi Sub Judul baru"
            >
              <template #title>Sub Judul</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorText
              v-model="ctn.bulan"
              :initial-value="originalContent3[indexCtn].bulan"
              placeholder="Isi Judul baru"
            >
              <template #title>Bulan</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorText
              v-model="ctn.tahun"
              :initial-value="originalContent3[indexCtn].tahun"
              placeholder="Isi Judul baru"
            >
              <template #title>Tahun</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <EditorText
              v-model="ctn.text"
              :initial-value="originalContent3[indexCtn].text"
              placeholder="Isi Judul baru"
            >
              <template #title>Text</template>
            </EditorText>
          </div>
          <div class="form-user col-md-12">
            <label for="posisi">Posisi</label>
            <b-form-select
              id="posisi"
              name="posisi"
              class="form-control"
              v-model="ctn.posisi"
              :options="[
                { text: '-- Pilih --', value: null },
                { text: 'Kanan', value: 'kanan' },
                { text: 'Kiri', value: 'kiri' },
              ]"
            >
            </b-form-select>
          </div>
        </div>
        <div class="row">          
          <div class="col-md-12 d-flex flex-row border-bottom py-3 mt-4">
            <button @click="addContent3" class="btn btn-outline-primary">
              + Tambah Sejarah
            </button>
            <button
              @click="deleteContent3"
              class="btn btn-outline-danger ml-3"
              :disabled="content3.length == 1"
            >
              - Hapus Sejarah
            </button>
          </div>
          <div class="col-md-12 pt-4">
            <button @click="saveContent3" class="btn btn-primary">Simpan</button>
          </div>
        </div>
      </div>
    </UIKonten>
    <UIKonten>
      <template #title>Konten 4</template>
      <div class="container-fluid">
        <div class="row border-bottom">
          <div class="form-user col-md-12">
            <EditorImage v-model="content4Title.gambar" :max-size="5">
              <template #title> Gambar </template>
              <template #warn>
                *Disarankan dengan Gambar atau Vektor 1276 x 638 pixel, dan Maksimal 5 Mb
              </template>
            </EditorImage>
          </div>
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
      originalContent3: [
        {
          id: "",
          gambar: "",
          judul: "",
          sub_judul: "",
          bulan: "",
          tahun: "",
          text: "",
          posisi: "",
        },
        {
          id: "",
          gambar: "",
          judul: "",
          sub_judul: "",
          bulan: "",
          tahun: "",
          text: "",
          posisi: "",
        },
      ],
      content3: [
        {
          id: "",
          gambar: "",
          judul: "",
          sub_judul: "",
          bulan: "",
          tahun: "",
          text: "",
          posisi: "",
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
    async saveContent3() {
      let allData = new FormData();
      for (let i = 0; i < this.content3.length; i++) {
        if (typeof this.content3[i].gambar == "string") {
          this.content3[i].gambar = "";
        }

        allData.append(`konten3[data][${i}][id]`, this.content3[i].id);
        allData.append(`konten3[data][${i}][gambar]`, this.content3[i].gambar);
        console.log(this.content3[i].judul);
        allData.append(`konten3[data][${i}][judul][0][judul1]`, this.content3[i].judul);
        allData.append(
          `konten3[data][${i}][sub_judul][0][sub_judul1]`,
          this.content3[i].sub_judul
        );
        allData.append(`konten3[data][${i}][bulan][0][bulan1]`, this.content3[i].bulan);
        allData.append(`konten3[data][${i}][tahun][0][tahun1]`, this.content3[i].tahun);
        allData.append(`konten3[data][${i}][text][0][text1]`, this.content3[i].text);
        allData.append(
          `konten3[data][${i}][posisi][0][posisi1]`,
          this.content3[i].posisi
        );
      }
      try {
        const res = await this.$axios.post("/api/cms/tentang-ujiaja", allData, {
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
    addContent3() {
      this.content3.push({
        id: "",
        gambar: "",
        judul: "",
        sub_judul: "",
        bulan: "",
        tahun: "",
        text: "",
        posisi: "",
      });
      this.originalContent3.push({
        id: "",
        gambar: "",
        judul: "",
        sub_judul: "",
        bulan: "",
        tahun: "",
        text: "",
        posisi: "",
      });
    },
    async deleteContent3() {
      try {
        const lastData = this.content3[this.content3.length - 1];
        if (lastData.id == "") {
          this.content3.pop();
          return false;
        }
        const res = await this.$axios.post(
          `/api/cms/tentang-ujiaja/delete-content3/${lastData.id}`,
          {}
        );
        if (res.data.success) {
          this.content3.pop();
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

        // Konten 3
        const master3 = data.data.dataContent3;
        if (master3.length > 0) {
          this.originalContent3 = master3;

          for (let indexCtn = 0; indexCtn < master3.length; indexCtn++) {
            const judul = JSON.parse(master3[indexCtn].judul);
            const subJudul = JSON.parse(master3[indexCtn].sub_judul);
            const tahun = JSON.parse(master3[indexCtn].tahun);
            const bulan = JSON.parse(master3[indexCtn].bulan);
            const text = JSON.parse(master3[indexCtn].text);
            const posisi = JSON.parse(master3[indexCtn].posisi);

            this.content3[indexCtn].id = master3[indexCtn].id;
            this.content3[indexCtn].gambar = master3[indexCtn].gambar;
            this.content3[indexCtn].judul = judul[0].judul1;
            this.content3[indexCtn].sub_judul = subJudul[0].sub_judul1;
            this.content3[indexCtn].bulan = bulan[0].bulan1;
            this.content3[indexCtn].tahun = tahun[0].tahun1;
            this.content3[indexCtn].text = text[0].text1;
            this.content3[indexCtn].posisi = posisi[0].posisi1;

            this.originalContent3[indexCtn].judul = judul[0].judul1;
            this.originalContent3[indexCtn].sub_judul = subJudul[0].sub_judul1;
            this.originalContent3[indexCtn].bulan = bulan[0].bulan1;
            this.originalContent3[indexCtn].tahun = tahun[0].tahun1;
            this.originalContent3[indexCtn].text = text[0].text1;
            this.originalContent3[indexCtn].posisi = posisi[0].posisi1;
          }
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
