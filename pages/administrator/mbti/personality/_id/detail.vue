<template>
  <div class="container-fluid crud pos-relative z-5">
    <div class="row d-flex no-gutters">
      <div class="col-md-12 dashboard">
        <div class="d-flex align-items-center justify-content-between">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Detail
            Kepribadian
          </h2>
          <BackUrl url="/administrator/mbti/personality" />
        </div>

        <div class="mb-3">
          <h4>Nama Kepribadian</h4>
          <p class="text-muted">
            {{ dataDetail.nama_singkat }} ({{ dataDetail.nama_panjang }})
          </p>
        </div>
        <div class="mb-3">
          <h4>Jenis Kepribadian</h4>
          <p class="text-muted">
            {{ dataDetail.jenis }}
          </p>
        </div>
        <div class="mb-3">
          <h4>Profesi yang Cocok</h4>
          <p class="text-muted">
            {{ dataDetail.profesi }}
          </p>
        </div>
        <div class="mb-3">
          <h4>Partner / Pasangan Alami</h4>
          <p class="text-muted">
            {{ dataDetail.partner }}
          </p>
        </div>
        <div class="mb-3">
          <h4>Kelebihan</h4>
          <div
            class="text-muted card card-body shadow-sm"
            v-html="dataDetail.deskripsi"
          ></div>
        </div>
        <div class="mb-3">
          <h4>Saran</h4>
          <div
            class="text-muted card card-body shadow-sm"
            v-html="dataDetail.saran"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  layout: "admin",
  components: { vSelect },
  data() {
    return {
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }]
      ],
      loading: false,
      selectedId: this.$route.params.id,
      dataDetail: {}
    };
  },
  mounted() {
    if (!this.$route.params.id)
      return this.$router.push("/administrator/mbti/personality");
    this.getDetail("kepribadian", this.$route.params.id);
  },
  methods: {
    validateForm() {
      console.log(this.form);
      if (
        !this.form.nama_singkat ||
        !this.form.nama_panjang ||
        !this.form.jenis ||
        !this.form.deskripsi ||
        !this.form.saran ||
        !this.form.profesi ||
        !this.form.partner
      ) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }
      this.submitData("dimensi");
    },
    submitData(type) {
      this.loading = true;
      this.$axios
        .$put(`/api/${type}/create`, this.form)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast(
              "Data " + type + " berhasil diperbarui.",
              {
                title: "Sukses",
                variant: "success",
                solid: true,
                autoHideDelay: 3000
              }
            );
            this.$router.replace("/administrator/mbti/personality");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataDetail = res.data;
            this.form = { ...this.dataDetail };
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
