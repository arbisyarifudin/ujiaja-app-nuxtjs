<template>
  <div class="row">
    <div class="col-md-12">
      <h3>Daftar Testimoni</h3>
      <p>
        Ini adalah daftar testimoni / ulasan kelas kursus dari Siswa yang pernah
        Anda ajar.
      </p>
    </div>
    <div class="col-md-12 my-3">
      <div class="bg-white px-4 py-4 crud">
        <div class="row crud-tools">
          <div class="col-md-6">
            <h4>Ulasan</h4>
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-6">
                <b-input-group>
                  <template #prepend>
                    <b-input-group-text
                      ><i class="fas fa-filter"></i
                    ></b-input-group-text>
                  </template>
                  <b-form-select
                    class="small"
                    v-model="filter.sortBy"
                    :options="[
                      { text: 'Tanggal', value: 'created_at' },
                      { text: 'Rating', value: 'nilai' }
                    ]"
                    @change="getUlasan()"
                  ></b-form-select>
                </b-input-group>
              </div>
              <div class="col-md-6">
                <b-input-group>
                  <template #prepend>
                    <b-input-group-text
                      ><i class="fas fa-filter"></i
                    ></b-input-group-text>
                  </template>
                  <b-form-select
                    class="small"
                    v-model="filter.sortDir"
                    :options="[
                      { text: 'Menaik', value: 'desc' },
                      { text: 'Menurun', value: 'asc' }
                    ]"
                    @change="getUlasan()"
                  ></b-form-select>
                </b-input-group>
              </div>
            </div>
          </div>
        </div>
        <hr class="mb-0" />
        <div class="courses-review review pos-relative">
          <ul class="review-list list-unstyled">
            <li
              class="d-flex review-item"
              v-for="(item, index) in list"
              :key="'uls' + index"
            >
              <img
                :src="item.privasi == 'Publik' ? ApiUrl(item.foto) : noImage"
                @error="noImage"
                alt="profile pic"
                class="review-avatar"
              />
              <div class="review-data ml-md-4">
                <div class="review-data__author">{{ item.pengulas }}</div>
                <div class="d-flex review-data__rating">
                  <div class="star mr-2">
                    <i
                      class="fas fa-star fa-fw"
                      v-for="i in item.nilai"
                      :key="'fas' + i"
                    ></i>
                    <i
                      class="far fa-star fa-fw"
                      v-for="x in 5 - item.nilai"
                      :key="'far' + x"
                    ></i>
                  </div>
                  <div class="time">{{ formatTanggal(item.tanggal) }}</div>
                </div>
                <div class="review-data__comment mt-2">
                  {{ item.ulasan }}
                </div>
                <div
                  class="review-action d-flex justify-content-end mt-2"
                  v-if="!item.tanggal_balasan"
                >
                  <button
                    class="btn btn-primary btn-sm square"
                    :ref="'openBalasan-' + index"
                    @click.prevent="openBalasan(index)"
                  >
                    Balas
                  </button>
                </div>
                <ul class="review-list review-list--child list-unstyled">
                  <li class="d-flex review-item" v-if="item.tanggal_balasan">
                    <img
                       v-if="ApiUrl"
                      :src="ApiUrl(item.foto_balasan)"
                        @error="noImage"
                      alt="profile pic"
                      class="review-avatar"
                    />
                    <div class="review-data ml-md-4">
                      <div class="review-data__author">
                        {{ tentor.nama_lengkap }}
                        <span class="ml-1 badge badge-primary">Tentor</span>
                      </div>
                      <div class="d-flex review-data__rating">
                        <div class="time">
                          {{ formatTanggal(item.tanggal_balasan) }}
                        </div>
                      </div>
                      <div class="review-data__comment mt-2">
                        {{ item.balasan }}
                      </div>
                      <div
                        class="review-action d-flex justify-content-end mt-2"
                      >
                        <div>
                          <button
                            class="btn btn-light btn-sm square"
                            :ref="'openBalasan-' + index"
                            @click.prevent="openBalasan(index)"
                          >
                            Ubah
                          </button>
                        </div>
                      </div>
                      <div
                        class="review-reply"
                        :ref="'formBalasan-' + index"
                        :id="'formBalasan-' + index"
                        style="display: none"
                      >
                        <label class="form-label">Ubah Ulasan:</label>
                        <textarea
                          rows="3"
                          class="form-control"
                          v-model="item.balasan"
                        ></textarea>
                        <div class="d-flex justify-content-end mt-3">
                          <button
                            class="btn btn-primary square"
                            @click.prevent="balasUlasan(item, index, true)"
                            :disabled="submitting"
                          >
                            <b-spinner small v-if="submitting"></b-spinner>
                            Balas
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="review-item" v-else>
                    <div
                      class="review-reply"
                      :ref="'formBalasan-' + index"
                      :id="'formBalasan-' + index"
                      style="display: none"
                    >
                      <label class="form-label">Balas Ulasan:</label>
                      <textarea
                        rows="3"
                        class="form-control"
                        v-model="item.balasan"
                      ></textarea>
                      <div class="d-flex justify-content-end mt-3">
                        <button
                          class="btn btn-primary square"
                          @click.prevent="balasUlasan(item, index)"
                          :disabled="submitting"
                        >
                          <b-spinner small v-if="submitting"></b-spinner>
                          Balas
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div class="pos-relative" v-if="!loading && list && list.length < 1">
            <UITableNotFound
              text="Belum ada ulasan yang Anda dapat dari Siswa."
            />
          </div>
          <UILoading v-if="loading"/>
          <b-pagination
            class="pagination-table"
            v-if="totalRows > 0 && totalRows > filter.perPage && !loading"
            v-model="filter.page"
            :total-rows="totalRows"
            :per-page="filter.perPage"
          >
          </b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "app",
  data() {
    return {
      submitting: false,
      loading: true,
      list: [],
      totalRows: 10,
      filter: {
        sortBy: "created_at",
        sortDir: "desc",
        page: 1,
        perPage: 10,
        keyword: ""
      }
    };
  },
  created() {
    this.getUlasan();
  },
  computed: {
    tentor() {
      return this.$store.state.dataUser.detail;
    }
  },
  watch: {
    "filter.page": function(value) {
      if (value) {
        this.getUlasan();
      }
    }
  },
  methods: {
    getUlasan() {
      this.loading = true;
      this.$axios
        .$get("api/kursus-ulasan", {
          params: {
            q: "",
            page: this.filter.page,
            paginate: this.filter.perPage,
            sortBy: this.filter.sortBy,
            sortDir: this.filter.sortDir
          }
        })
        .then(res => {
          if (res.success) {
            this.list = res.data.data;
            this.totalRows = res.data.total;
            this.filter.perPage = res.data.per_page;
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    openBalasan(index) {
      const refs1 = this.$refs["openBalasan-" + index];
      const refs2 = this.$refs["formBalasan-" + index];
      if (refs2 && refs2[0]) {
        refs1[0].style = "display: none";
        refs2[0].style = "display: block";
      }
    },
    balasUlasan(ulasan, index, isEdit = false) {
      this.submitting = true;
      this.$axios
        .$put("api/kursus-ulasan/reply/" + ulasan.id, {
          balasan: ulasan.balasan
        })
        .then(res => {
          this.showToastMessage("Balasan berhasil di-submit!", "success");
          ulasan.tanggal_balasan = res.data.tanggal_balasan;
          const refs = this.$refs["formBalasan-" + index];
          if (refs && refs[0]) {
            refs[0].style = "display: none";
            if (isEdit) {
              const refs2 = this.$refs["openBalasan-" + index];
              if (refs2 && refs2[0]) {
                refs2[0].style = "display: block";
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.submitting = false));
    }
  }
};
</script>
