<template>
  <div class="container-fluid crud">
    <div class="row d-flex no-gutters">
      <div class="col-md-12 dashboard px-0">
        <h2 class="dash-label">Pengaturan</h2>
        <p>
          Disini Anda bisa lakukan pengaturan website/aplikasi.
        </p>
      </div>
      <div class="col-md-12 crud-body">
        <UILoading v-if="loading" />
        <b-tabs v-model="tab" class="mt-2" content-class="pt-4">
          <b-tab title="Umum" v-if="isHavePermission('Pengaturan', 'View')">
            <div class="form-user">
              <div class="form-group mb-4 row">
                <label class="form-label col-md-2">Logo</label>
                <div class="col-md-6">
                  <input
                    type="file"
                    ref="logo"
                    class="form-control"
                    @change="handleUploadedFile('logo')"
                  />
                  <div class="text-info mt-1" style="font-size: 13px">Ukuran gambar logo disarankan 1:1 ratio. Misal 150x150, 300x300, dst</div>
                </div>
                <div class="col-md-2">
                  <img
                    v-if="!loading"
                    id="logo_preview"
                    :src="ApiUrl(form.logo)"
                    alt="logo"
                    class="img-fluid"
                    style="max-height: 100px"
                  />
                </div>
              </div>
              <div class="form-group mb-4 row">
                <label class="form-label col-md-2">Nama website</label>
                <div class="col-md-8">
                  <b-form-input
                    name="seo_web_name"
                    v-model="form.seo_web_name"
                  ></b-form-input>
                </div>
              </div>
              <div class="form-group mb-4 row">
                <label class="form-label col-md-2">Alamat Kantor</label>
                <div class="col-md-8">
                  <b-textarea
                    style="opacity: 100%"
                    name="alamat_kantor"
                    v-model="form.alamat_kantor"
                  ></b-textarea>
                </div>
              </div>
              <div class="form-group mb-4 row">
                <label class="form-label col-md-2">Telp.</label>
                <div class="col-md-8">
                  <b-form-input
                    type="number"
                    min="0"
                    name="telp"
                    v-model="form.telp"
                  ></b-form-input>
                </div>
              </div>
              <div class="form-group mb-4 row">
                <label class="form-label col-md-2">Email</label>
                <div class="col-md-8">
                  <b-form-input
                    name="email"
                    v-model="form.email"
                  ></b-form-input>
                </div>
              </div>
              <div class="form-group mb-4 row">
                <label class="form-label col-md-2">Instagram</label>
                <div class="col-md-8">
                  <b-form-input
                    name="instagram"
                    v-model="form.instagram"
                  ></b-form-input>
                </div>
              </div>
              <div class="form-group mb-4 row">
                <label class="form-label col-md-2">Facebook</label>
                <div class="col-md-8">
                  <b-form-input
                    name="facebook"
                    v-model="form.facebook"
                  ></b-form-input>
                </div>
              </div>
              <div class="form-group mb-4 row">
                <label class="form-label col-md-2">Youtube</label>
                <div class="col-md-8">
                  <b-form-input
                    name="youtube"
                    v-model="form.youtube"
                  ></b-form-input>
                </div>
              </div>
            </div>
            <div class="d-flex">
              <button
                type="submit"
                class="btn btn-primary square"
                :disabled="submitting || loading"
                @click.prevent="submitData"
                v-if="isHavePermission('Pengaturan', 'Edit')"
              >
                <b-spinner
                  small
                  class="mr-1"
                  v-if="submitting || loading"
                ></b-spinner>
                Simpan
              </button>
            </div>
          </b-tab>
          <b-tab title="Biaya" v-if="isHavePermission('Pengaturan', 'View')">
            <div class="form-user">
              <div class="form-group mb-4 row">
                <label class="form-label col-md-2" for="fee_banktrf"
                  >Biaya Pembayaran Bank Transfer</label
                >
                <div class="col-md-8">
                  <b-form-input
                    type="number"
                    :min="0"
                    name="fee_banktrf"
                    v-model="form.fee_banktrf"
                  ></b-form-input>
                </div>
              </div>
            </div>
            <div class="form-user">
              <div class="form-group mb-4 row">
                <label class="form-label col-md-2" for="fee_xendit"
                  >Biaya Pembayaran Instan</label
                >
                <div class="col-md-8">
                  <b-form-input
                    type="number"
                    :min="0"
                    name="fee_xendit"
                    v-model="form.fee_xendit"
                  ></b-form-input>
                </div>
              </div>
            </div>
            <div class="form-user">
              <div class="form-group mb-4 row">
                <label class="form-label col-md-2" for="fee_admin"
                  >Biaya Admin/Pemotongan Tentor (%)</label
                >
                <div class="col-md-8">
                  <b-form-input
                    type="number"
                    :min="0"
                    name="fee_admin"
                    v-model="form.fee_admin"
                  ></b-form-input>
                </div>
              </div>
            </div>
            <div class="form-user">
              <div class="form-group mb-4 row">
                <label class="form-label col-md-2" for="min_penarikan"
                  >Minimal Nominal Pencairan</label
                >
                <div class="col-md-8">
                  <b-form-input
                    type="number"
                    :min="0"
                    name="min_penarikan"
                    v-model="form.min_penarikan"
                  ></b-form-input>
                </div>
              </div>
            </div>
            <div class="form-user">
              <div class="form-group mb-4 row">
                <label class="form-label col-md-2" for="biaya_transfer"
                  >Biaya Transfer Proses Pencairan</label
                >
                <div class="col-md-8">
                  <b-form-input
                    type="number"
                    :min="0"
                    name="biaya_transfer"
                    v-model="form.biaya_transfer"
                  ></b-form-input>
                </div>
              </div>
            </div>
            <div class="d-flex">
              <button
                type="submit"
                class="btn btn-primary square"
                :disabled="submitting || loading"
                @click.prevent="submitData"
                v-if="isHavePermission('Pengaturan', 'Edit')"
              >
                <b-spinner
                  small
                  class="mr-1"
                  v-if="submitting || loading"
                ></b-spinner>
                Simpan
              </button>
            </div>
          </b-tab>
          <b-tab title="Level" v-if="isHavePermission('Level', 'View')">
            <div class="form-user">
              <div
                class="form-group mb-4 row level"
                v-for="(level, l_index) in dataLevel"
                :key="'l' + l_index"
              >
                <label for="" class="form-label col-md-2 mb-4">
                  <div class="p-2" style="border: 1px dashed #d5d5d5;">
                    <span>Lv.</span>
                    <span style="font-weight: 600; font-size: 20px">{{
                      level.nama_level
                    }}</span>
                  </div>
                </label>
                <div class="col-md-8">
                  <div class="mb-4">
                    <label>Deskripsi</label>
                    <b-textarea v-model="level.deskripsi_level"></b-textarea>
                  </div>
                  <div class="row">
                    <div class="col-lg-4 col-md-4 col-6 mb-4">
                      <label>Honor (Rp)</label>
                      <b-form-input
                        type="number"
                        :min="0"
                        v-model="level.honor_level"
                      ></b-form-input>
                    </div>
                    <div class="col-lg-4 col-md-4 col-6 mb-4">
                      <label>Sesi Waktu (Menit)</label>
                      <b-form-input
                        type="number"
                        :min="0"
                        v-model="level.sesi_honor_level"
                      ></b-form-input>
                    </div>
                    <div class="col-lg-4 col-md-4 col-6 mb-4">
                      <label>Syarat Lulus UKTT</label>
                      <b-form-select
                        :options="dataUKTT"
                        text-field="nama_produk"
                        value-field="id"
                        class="form-control"
                        v-model="level.id_uktt"
                      ></b-form-select>
                    </div>
                    <div class="col-lg-4 col-md-4 col-6 mb-4">
                      <label>Minimal Rate Tentor</label>
                      <b-form-input
                        type="number"
                        :min="0"
                        v-model="level.minimal_rate_mengajar"
                      ></b-form-input>
                    </div>
                    <div class="col-lg-4 col-md-4 col-6 mb-4">
                      <label>Minimal Total Mengajar</label>
                      <b-form-input
                        type="number"
                        :min="0"
                        v-model="level.minimal_total_mengajar"
                      ></b-form-input>
                    </div>
                    <div class="col-lg-4 col-md-4 col-6 mb-4">
                      <label>Rentang Waktu Mengajar (hari)</label>
                      <b-form-input
                        type="number"
                        :min="0"
                        v-model="level.maksimal_waktu_mengajar"
                      ></b-form-input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex">
              <button
                type="submit"
                class="btn btn-primary square"
                :disabled="submitting || loading"
                @click.prevent="submitDataLevel"
                v-if="isHavePermission('Level', 'Edit')"
              >
                <b-spinner
                  small
                  class="mr-1"
                  v-if="submitting || loading"
                ></b-spinner>
                Simpan
              </button>
            </div>
          </b-tab>
          <b-tab title="Bank" v-if="isHavePermission('Bank', 'List')">
            <div class="form-user">
              <div
                class="form-group mb-4 row level"
                v-for="(bank, b_index) in dataBank"
                :key="'b' + b_index"
              >
                <label for="" class="form-label col-md-2 mb-4">
                  <div class="p-2" style="border: 1px dashed #d5d5d5;">
                    <!-- <span>Lv.</span> -->
                    <span style="font-weight: 600; font-size: 20px">{{
                      bank.nama_bank
                    }}</span>
                  </div>
                </label>
                <div class="col-md-8">
                  <div class="row">
                    <div class="col-lg-8 col-md-8 mb-4">
                        <label>Nama Bank</label>
                        <b-form-input v-model="bank.nama_bank"></b-form-input>
                    </div>
                    <div class="col-lg-2 col-md-2 mb-4">
                      <label>Status</label>
                      <b-form-radio-group
                        class="btn-radio-toggle"
                        :id="'btn-radio-' + b_index"
                        v-model="bank.aktif"
                        :options="[
                          { text: 'Aktif', value: 'Ya' },
                          { text: 'Tidak', value: 'Tidak' }
                        ]"
                        button-variant="outline-primary"
                        size="sm"
                        :name="'status-' + b_index"
                        buttons
                      ></b-form-radio-group>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-4 col-md-4 col-6 mb-4">
                      <label>Nama Pemilik</label>
                      <b-form-input
                        v-model="bank.nama_pemilik"
                      ></b-form-input>
                    </div>
                    <div class="col-lg-4 col-md-4 col-6 mb-4">
                      <label>Nomor Rekening</label>
                      <b-form-input
                        type="number"
                        :min="0"
                        v-model="bank.nomor_rekening"
                      ></b-form-input>
                    </div>
                    <div class="col-lg-4 col-md-4 col-6 mb-4">
                      <label>Cabang <code>[opsional]</code></label>
                      <b-form-input
                        v-model="bank.cabang"
                      ></b-form-input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex">
              <button
                type="submit"
                class="btn btn-primary square"
                :disabled="submitting || loading"
                @click.prevent="submitDataBank"
                v-if="isHavePermission('Bank', 'Edit')"
              >
                <b-spinner
                  small
                  class="mr-1"
                  v-if="submitting || loading"
                ></b-spinner>
                Simpan
              </button>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  fetchOnServer: false,
  data() {
    return {
      loading: true,
      submitting: false,
      tab: 0,
      form: {
        logo: "",
        seo_web_name: "",
        alamat_kantor: ""
      },
      files: {
        logo: null
      },
      dataLevel: [],
      dataUKTT: [],
      dataBank: []
    };
  },
  mounted() {
    this.getAllSetting();
  },
  computed: {
    settings() {
      return this.$store.state.dataSetting;
    },
    userPermissions() {
      return this.$store.state.userPermissions;
    },
  },
  watch: {
    tab(value) {
      console.log('tab',value);
      if (value == 2) {
        if (this.dataUKTT.length < 1) {
          this.getUKTT();
        }
        if (this.dataLevel.length < 1) {
          this.getAllLevel();
        }
      } else if (value == 3) {
        if (this.dataBank.length < 1) {
          this.getAllBank();
        }
      }
    }
  },
  methods: {
    getAllSetting() {
      this.loading = true;
      this.$axios
        .$get("api/pengaturan")
        .then(async response => {
          if (response.success) {
            await this.$store.commit("set", ["dataSetting", response.data]);
            this.form.logo = this.getSetting("logo");
            this.form.telp = this.getSetting("telp");
            this.form.youtube = this.getSetting("youtube");
            this.form.facebook = this.getSetting("facebook");
            this.form.instagram = this.getSetting("instagram");
            this.form.email = this.getSetting("email");
            this.form.seo_web_name = this.getSetting("seo_web_name");
            this.form.alamat_kantor = this.getSetting("alamat_kantor");

            this.form.fee_banktrf = this.getSetting("fee_banktrf");
            this.form.fee_xendit = this.getSetting("fee_xendit");
            this.form.fee_admin = this.getSetting("fee_admin");
            this.form.min_penarikan = this.getSetting("min_penarikan");
            this.form.biaya_transfer = this.getSetting("biaya_transfer");
          }
        })
        .catch(error => {
          // console.log(error);
          this.catchError(error)
        })
        .finally(() => {
          this.loading = false;
          // if (this.isHavePermission('Pengaturan', 'List')) {
          //   console.log('hav pengaturan')
          //   this.getAllSetting();
          // } else 
          if (!this.isHavePermission('Pengaturan', 'View') && this.isHavePermission('Level', 'View')) {
            // console.log('hav level')
            this.getAllLevel()
          } else if (!this.isHavePermission('Pengaturan', 'View') && !this.isHavePermission('Level', 'View') && this.isHavePermission('Bank', 'List')) {
            // console.log('hav bank')
            this.getAllBank()
          }
        });
    },
    getAllLevel() {
      this.loading = true;
      this.$axios
        .$get("api/level")
        .then(async response => {
          if (response.success) {
            this.dataLevel = response.data;
          }
        })
        .catch(error => {
          // console.log(error);
          this.catchError(error)
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getUKTT() {
      this.loading = true;
      this.$axios
        .$get("api/produk", {
          params: { paginate: 99, kategori_produk: "UKTT" }
        })
        .then(async response => {
          if (response.success) {
            this.dataUKTT = [
              {
                id: null,
                nama_produk: "--Pilih UKTT--"
              },
              ...response.data.data
            ];
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getSetting(key) {
      const settings = this.settings;
      const foundSetting = settings.find(item => item.key == key);
      if (foundSetting) {
        return foundSetting.isi;
      }
      return "";
    },
    getAllBank() {
      this.loading = true;
      this.$axios
        .$get("api/bank")
        .then(async response => {
          if (response.success) {
            this.dataBank = response.data.data;
          }
        })
        .catch(error => {
          // console.log(error);
          this.catchError(error)
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updateSetting(key) {},
    submitData() {
      console.log(this.form);
      this.submitting = true;
      this.$axios
        .$put("/api/pengaturan/multiple", this.form)
        .then(response => {
          console.log(response);
          this.showToastMessage('Pengaturan berhasil disimpan!', 'success');
          this.getAllSetting()
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.submitting = false;
        });
    },
    submitDataLevel() {
      console.log(this.dataLevel)
      // return
      this.submitting = true;
      this.$axios
        .$put("/api/level/multiple", this.dataLevel)
        .then(response => {
          console.log(response);
          this.showToastMessage('Level berhasil disimpan!', 'success');
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.submitting = false;
        });
    },
    submitDataBank() {
      console.log(this.dataBank)
      // return
      this.submitting = true;
      this.$axios
        .$put("/api/bank/update/multiple", {
          banks: this.dataBank
        })
        .then(response => {
          console.log(response);
          this.showToastMessage('Bank berhasil disimpan!', 'success');
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.submitting = false;
        });
    },
    handleUploadedFile(param) {
      this.files[param] = this.$refs[param].files[0];
      console.log(this.files[param]);

      let reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById(param + "_preview").src = e.target.result;
      };
      reader.readAsDataURL(this.files[param]); // convert to base64 string

      let formData = new FormData();

      formData.append("image", this.files[param]);
      // console.log(formData);

      if (this.files[param] != null) {
        this.loading = true;
        this.$axios
          .$post(`/api/upload/image`, formData)
          .then(res => {
            console.log(res);
            if (res) {
              this.form[param] = res.data.image_url;
            }
            return;
          })
          .catch(err => {
            console.log(err);
            this.catchError(err);
          })
          .finally(() => (this.loading = false));
      }
    },
    isHavePermission(moduleName, actionName) {
      // console.log(this.perms);
      const moduleFound = this.userPermissions.find(module => moduleName.includes(module.label));
      if (moduleFound) {
        // console.log('moduleFound', moduleFound)
        const actionFound = moduleFound.actions.find(
          action => action.label == actionName
        );
        if (actionFound) {
          // console.log("actionFound", actionFound);
          if (actionFound.allow) {
            return true;
          }
          return false;
        }
        return false;
      }
      return false;
    }
  }
};
</script>
