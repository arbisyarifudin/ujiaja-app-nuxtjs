<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">Ubah Materi</h2>
          <!-- <p>
            Ayo, buat data master kelas sekarang juga untuk merelasikan data
            siswa.
          </p> -->
        </div>
        <div class="col-md-12 crud-body">
          <div class="form-user mt-3">
            <div class="form-group reg-siswa">
              <label for="title">Nama/Judul Materi <code>*</code></label>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="Tulis Nama/Judul Materi"
                v-model="form.title"
              />
            </div>
            <div class="form-group reg-siswa">
              <label for="price">Harga Materi <code>*</code></label>
              <input
                type="number"
                class="form-control"
                id="price"
                placeholder="Tulis Harga Materi"
                v-model="form.price"
              />
            </div>
            <div class="form-group reg-siswa">
              <label for="desc">Deskripsi Materi <code>*</code></label>
              <textarea
                class="form-control"
                id="desc"
                placeholder="Tulis Deskripsi Materi"
                v-model="form.desc"
              ></textarea>
            </div>
            <div class="form-group reg-siswa">
              <div class="row">
                <div class="col-md-3">
                  <img
                    v-if="getSetting"
                    :src="ApiUrl('storage/' + dataDetail.cover_image_link)"
                    @error="ApiUrl(getSetting('logo'))"
                    alt="icon prodi"
                    class="img-fluid"
                    id="cover_image_preview"
                  />
                </div>
                <div class="col-md-8">
                  <label for="cover_image">Unggah Gambar <code>*</code></label>
                  <div class="custom-file mb-3">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="cover_image"
                      ref="cover_image"
                      @change="handleUploadedFile('cover_image', 'image')"
                      accept=".jpg,.jpeg,.png,.gif"
                    />
                    <label class="custom-file-label" for="cover_image"
                      >Pilih file gambar atau drag kesini</label
                    >
                    <div class="small text-danger mt-1">
                      <small>Hanya mengizinkan file berformat gambar.</small>
                    </div>
                  </div>
                  <label for="file">Unggah File <code>*</code></label>
                  <div class="custom-file mb-3">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="file"
                      ref="file"
                      @change="handleUploadedFile('file', 'file')"
                      accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, dan
                        .zip"
                    />
                    <label class="custom-file-label" for="file"
                      >Pilih file materi atau drag kesini</label
                    >
                    <div class="small text-danger mt-1">
                      <small
                        >Menerima .pdf, .doc, .docx, .xls, .xlsx, .ppt, dan
                        .zip</small
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group reg-siswa">
              <label for="published">Status Tampil <code>*</code></label>
              <b-form-radio-group
                id="published"
                name="published"
                v-model="form.published"
                :options="showOptions"
              >
              </b-form-radio-group>
            </div>
          </div>
        </div>
        <div class="crud-footer d-flex justify-content-end mt-4">
          <nuxt-link
            to="/administrator/materi"
            class="btn btn-outline-secondary mr-2"
          >
            Kembali
          </nuxt-link>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            <b-spinner small class="mr-1" v-if="loading"></b-spinner>
            Simpan
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      loading: false,
      dataMaster: {
        jenjang: []
      },
      form: {
        title: "",
        price: 0,
        desc: "",
        cover_image: null,
        file: null,
        published: 1
      },
      files: {},
      dataDetail: {},
      showOptions: [
        { text: "Publish", value: 1 },
        { text: "Hide", value: 0 }
      ]
    };
  },
  mounted() {
    if (!this.$route.params.id)
      return this.$router.push("/administrator/materi");
    this.$store.commit("modifyBreadcrumb", [
      {
        text: "Material",
        href: "/administrator/materi"
      },
      {
        text: "Edit",
        active: true
      }
    ]);
    this.getDetail("material", this.$route.params.id);
  },
  methods: {
    validateForm() {
      // console.log(this.form);
      // console.log(this.files);`
      if (
        !this.form.title ||
        !this.form.price ||
        !this.form.desc
      ) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }
      this.submitData("material");
    },
    submitData(type) {
      this.loading = true;

      let formData = new FormData();

      formData.append("title", this.form.title);
      formData.append("price", this.form.price);
      formData.append("desc", this.form.desc);
      formData.append("published", this.form.published);
      formData.append("cover_image", this.files.cover_image ?? '');
      formData.append("file", this.files.file ?? '');
      formData.append("_method", 'PUT');

      this.$axios
        .$post(`/api/${type}/update/${this.$route.params.id}`, formData)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast("Data materi berhasil ditambah.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.$router.replace("/administrator/materi");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    async getDetail(type, id) {
      this.loading = true;
      await this.$axios
        .$get(`/api/${type}/find/${id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataDetail = res.data;
            this.form.title = this.dataDetail.title
            this.form.price = this.dataDetail.price
            this.form.desc = this.dataDetail.desc
            this.form.published = this.dataDetail.published
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    handleUploadedFile(param, type = "image") {
      this.files[param] = this.$refs[param].files[0];
      // console.log(this.files[param]);

      this.$refs[param].closest(
        ".custom-file"
      ).children[1].textContent = this.files[param].name;

      let reader = new FileReader();
      reader.onload = function(e) {
        const imgPreview = document.getElementById(param + "_preview");
        if (imgPreview != null) {
          imgPreview.src = e.target.result;
        }
      };
      reader.readAsDataURL(this.files[param]); // convert to base64 string

      // let formData = new FormData();

      // formData.append(type, this.files[param]);
      // console.log(formData);
      return;

      if (this.files[param] != null) {
        this.loading = true;
        this.$axios
          .$post(`/api/upload/${type}`, formData)
          .then(res => {
            console.log(res);
            if (res) {
              this.form.icon_prodi = res.data.image_url;
            }
            return;
          })
          .catch(err => {
            console.log(err);
            this.catchError(err);
          })
          .finally(() => (this.loading = false));
      }
    }
  }
};
</script>
