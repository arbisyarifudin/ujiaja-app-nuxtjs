<template>
  <div class="container-fluid crud">
    <form @submit.prevent>
      <div class="row d-flex no-gutters">
        <div
          class="col-md-12 dashboard"
          style="position: relative; z-index: 10"
        >
          <div class="d-flex align-items-center justify-content-between">
            <h2 class="dash-label">
              <b-spinner type="grow" class="mr-2" v-if="loading" /> Buat Soal
              Tryout
            </h2>
            <!-- <nuxt-link
              to="/administrator/tryout"
              class="btn btn-outline-secondary mr-2"
            >
              <b-icon icon="arrow-left" class="mr-1"></b-icon>
              Kembali
            </nuxt-link> -->
            <BackUrl url="/administrator/tryout" />
          </div>
          <p>
            <i class="far fa-file-alt fa-fw mr-1"></i>
            <span class="font-weight-bold">{{ dataDetail.judul }}</span> -
            <span>{{
              dataDetail.jenis_soal
                ? dataDetail.jenis_soal
                : dataDetail.kategori
            }}</span>
            <span v-if="dataDetail.kelompok_soal">{{
              dataDetail.kelompok_soal
            }}</span>
            <span
              v-if="
                dataDetail.penjurusan &&
                  dataDetail.penjurusan.kelas &&
                  dataDetail.penjurusan.kelas.jenjang
              "
              >{{ dataDetail.penjurusan.kelas.jenjang.nama_jenjang }}
              {{
                dataDetail.kategori == "Asmenas"
                  ? "- " + dataDetail.penjurusan.kelas.nama_kelas
                  : ""
              }}</span
            >
          </p>
          <div class="alert small alert-light border-1">
            <h3 class="h6 small">Tentang:</h3>
            {{ dataDetail.deskripsi }}
          </div>
        </div>
        <div class="col-md-12 crud-body">
          <UILoading
            v-if="refetch"
            text="Mohon menunggu. Sedang melakukan pembaruan nomor soal..."
            style="position: fixed; bottom: 0; left: 0; z-index: 99"
            :textStyle="{ backgroundColor: 'white', padding: '10px' }"
          />
          <div class="row">
            <div class="col-md-12 buat-soal mt-4">
              <p>Panduan Pengerjaan <code>*</code></p>
              <!-- <textarea
                name=""
                id="textarea"
                cols="30"
                rows="10"
                class="w-100"
                v-model="formTryout.panduan_pengerjaan"
              ></textarea> -->
              <client-only>
                <VueEditor
                  id="panduan_pengerjaan"
                  ref="panduan_pengerjaan"
                  @blur="onBlurPanduan"
                  :editorOptions="editorOptions"
                  v-model="formTryout.panduan_pengerjaan"
                />
                <div class="d-flex justify-content-end">
                  <button
                    class="btn btn-primary btn-sm square btn-add-mathjax"
                    @click="addMathJax('panduan_pengerjaan')"
                  >
                    Add Formula
                  </button>
                </div>
              </client-only>
              <UISaveStatus :data="onSubmit.panduan" />
            </div>
            <div class="col-md-12 accordion">
              <UILoading v-if="loading" />
              <div id="accordion" role="tab-list">
                <b-card
                  no-body
                  class="mb-4"
                  v-for="(soal, a) in formSoal"
                  :key="'A' + a"
                >
                  <b-card-header header-tag="header" role="tab" class="p-0">
                    <a
                      class="card-link"
                      href="#"
                      style="padding: 30px;"
                      @click.prevent="updateAccordion(a)"
                    >
                      <p class="text-card m-0 text-h5">
                        Soal
                        <span v-if="dataDetail.kategori != 'ASPD'">{{
                          soal.jenis_soal
                        }}</span>
                        <!-- <span v-else-if="dataDetail.kategori == 'ASPD'">{{
                          soal.mapel.nama_mapel
                        }}</span> -->
                        <span v-if="soal.mapel">
                          - {{ soal.mapel.nama_mapel }}</span
                        >
                        <span v-if="dataDetail.kategori == 'Asmenas'">
                          - Bagian {{ a + 1 }}</span
                        >
                        <span
                          v-if="
                            dataDetail.jenis_soal == 'Campuran' &&
                              soal.kelompok_soal
                          "
                          >- {{ soal.kelompok_soal }}</span
                        >
                      </p>
                      <span class="collapsed" v-if="tab != a && !visible"
                        ><i class="fas fa-plus"></i
                      ></span>
                      <span class="collapsed" v-else-if="tab == a && !visible"
                        ><i class="fas fa-plus"></i
                      ></span>
                      <span class="collapsed" v-else-if="tab != a && visible"
                        ><i class="fas fa-plus"></i
                      ></span>
                      <span class="expanded" v-else-if="tab == a && visible"
                        ><i class="fas fa-minus"></i> Minimize</span
                      ></a
                    >
                  </b-card-header>
                  <b-collapse
                    :id="'accordion-' + a"
                    :visible="tab == a && visible"
                    accordion="my-accordion"
                    role="tabpanel"
                  >
                    <div class="card-body">
                      <div
                        :class="[
                          dataDetail.kategori != 'ASPD'
                            ? 'card-body-content'
                            : 'mt-n3 px-3'
                        ]"
                      >
                        <div class="col-md-12 text-right p-0">
                          <!-- v-if="
                              soal.pertanyaan.length > 0 &&
                                a != 0 &&
                                dataDetail.kategori != 'ASPD'
                            " -->
                          <button
                            type="button"
                            class="btn btn-danger py-1"
                            @click.prevent="deleteMapel(soal.id, a)"
                            :disabled="loading"
                          >
                            <b-spinner
                              v-if="loading"
                              type="grow"
                              small
                              class="mr-1"
                            ></b-spinner>
                            Hapus Mata Pelajaran
                          </button>
                        </div>
                        <div
                          class="col-md-12 form-user form-pilih-kelas p-0 mt-3"
                        >
                          <div class="form-group reg-siswa">
                            <label for="id_mapel"
                              >Mata Pelajaran <code>*</code></label
                            >
                            <select
                              class="form-control pl-0"
                              id="id_mapel"
                              v-model="soal.id_mapel"
                              @change="onUpdateSoal(soal)"
                            >
                              <option :value="null">-- Pilih --</option>
                              <option
                                :value="mapel.id"
                                v-for="(mapel, m) in dataMaster['mapel']"
                                :key="m"
                                >{{ mapel.nama_mapel }}</option
                              >
                            </select>
                          </div>
                          <div class="form-group reg-siswa">
                            <label for="jeda_waktu_antar_mapel"
                              >Alokasi Waktu Per-Mata Pelajaran (Detik) <code>*</code></label
                            >
                            <input
                              type="text"
                              class="form-control pl-0"
                              id="jeda_waktu_antar_mapel"
                              placeholder="Ex: 80"
                              v-model="soal.alokasi_waktu_per_mapel"
                              @input="onUpdateSoal(soal)"
                            />
                          </div>
                          <div class="form-group reg-siswa mb-0">
                            <label for="jeda_waktu_antar_mapel"
                              >Jeda Waktu Dengan Mata Pelajaran Berikutnya (Detik) <code>*</code></label
                            >
                            <input
                              type="text"
                              class="form-control pl-0"
                              id="jeda_waktu_antar_mapel"
                              placeholder="Ex: 30"
                              v-model="soal.jeda_waktu_antar_mapel"
                              @input="onUpdateSoal(soal)"
                            />
                          </div>
                          <UISaveStatus
                            :data="onSubmit.soal[soal.id]"
                            v-if="
                              onSubmit.soal[soal.id] &&
                                dataDetail.panduan_pengerjaan
                            "
                          />
                          <button
                            v-if="soal.pertanyaan.length == 0"
                            type="button"
                            class="btn btn-primary mt-4"
                            @click.prevent="createBab(soal.id, soal)"
                            :disabled="loading"
                          >
                            <b-spinner
                              v-if="loading"
                              type="grow"
                              small
                              class="mr-1"
                            ></b-spinner>
                            Buat Pertanyaan
                          </button>
                        </div>

                        <!-- SOAL PERTANYAAN -->
                        <template v-for="(soalp, b) in soal.pertanyaan">
                          <div class="card-body-content-dua" :key="'B' + b">
                            <div class="col-md-12 dashboard soal mt-2">
                              <div class="header-soal">
                                <label>Bab Mata Pelajaran <code>*</code></label>
                                <button
                                  type="button"
                                  class="btn btn-danger py-1"
                                  v-if="b != 0"
                                  :disabled="loading"
                                  @click.prevent="
                                    deleteBabMapel(soal.pertanyaan, b)
                                  "
                                >
                                  <b-spinner
                                    v-if="loading"
                                    type="grow"
                                    small
                                    class="mr-1"
                                  ></b-spinner>
                                  Hapus Bab Mata Pelajaran
                                </button>
                              </div>
                              <div class="form-user">
                                <div class="form-group reg-siswa mb-4">
                                  <!-- <input
                                  type="text"
                                  class="form-control pl-0"
                                  id="text"
                                  placeholder="Isi Bab Mata Pelajaran"
                                /> -->
                                  <b-form-tags
                                    :input-id="'bab-' + soalp.id + '-' + b"
                                    separator=","
                                    remove-on-delete
                                    placeholder="Isi Bab Mata Pelajaran"
                                    v-model="soalp.bab_mapel"
                                    duplicate-tag-text="Bab sudah ada"
                                    @input="onUpdatePertanyaan(soalp)"
                                  ></b-form-tags>
                                  <UISaveStatus
                                    :data="onSubmit.pertanyaan[soalp.id]"
                                    v-if="onSubmit.pertanyaan[soalp.id]"
                                  />
                                </div>
                              </div>
                              <label
                                >Teks Untuk Beberapa Soal <code>*</code></label
                              >
                              <div
                                class="small text-danger mb-3"
                                style="font-size: 15px"
                              >
                                Kosongkan jika tidak diperlukan penjelasan
                                pertanyaan.
                              </div>
                              <VueEditor
                                :id="
                                  'penjelasan_pertanyaan-' + soalp.id + '-' + b
                                "
                                :ref="
                                  'penjelasan_pertanyaan-' + soalp.id + '-' + b
                                "
                                :editorOptions="editorOptions"
                                v-model="soalp.penjelasan_pertanyaan"
                                @blur="onUpdatePertanyaan(soalp)"
                              />
                              <div class="d-flex justify-content-end">
                                <button
                                  class="btn btn-primary btn-sm square btn-add-mathjax"
                                  @click="
                                    addMathJax(
                                      'penjelasan_pertanyaan-' +
                                        soalp.id +
                                        '-' +
                                        b
                                    )
                                  "
                                >
                                  Add Formula
                                </button>
                              </div>
                              <UISaveStatus
                                :data="onSubmit.pertanyaan[soalp.id]"
                                v-if="onSubmit.pertanyaan[soalp.id]"
                              />
                            </div>
                            <div
                              class="card-body-content-dua dua"
                              :id="'pertanyaan-' + soalp.nomor"
                            >
                              <div class="col-md-12 px-4 py-2 soal mt-2">
                                <div class="header-soal">
                                  <p style="font-weight: bold">
                                    Pertanyaan {{ soalp.nomor }} <code>*</code>
                                  </p>
                                  <button
                                    type="button"
                                    class="btn btn-danger dua py-1"
                                    v-if="b + 1 != 1"
                                    @click.prevent="
                                      deleteQuestion(soal.pertanyaan, b)
                                    "
                                    :disabled="loading"
                                  >
                                    <b-spinner
                                      v-if="loading"
                                      type="grow"
                                      small
                                      class="mr-1"
                                    ></b-spinner>
                                    Hapus Pertanyaan
                                  </button>
                                </div>

                                <!-- <textarea
                                  name=""
                                  id="textarea"
                                  cols="30"
                                  rows="10"
                                  class="w-100"
                                  v-model="soalp.soal"
                                ></textarea> -->
                                <client-only>
                                  <VueEditor
                                    :id="'soal-' + soalp.id + '-' + b"
                                    :ref="'soal-' + soalp.id + '-' + b"
                                    v-model="soalp.soal"
                                    :editorOptions="editorOptions"
                                    @blur="onUpdatePertanyaan(soalp)"
                                  />
                                  <div class="d-flex justify-content-end">
                                    <button
                                      class="btn btn-primary btn-sm square btn-add-mathjax"
                                      @click="
                                        addMathJax('soal-' + soalp.id + '-' + b)
                                      "
                                    >
                                      Add Formula
                                    </button>
                                  </div>
                                </client-only>

                                <UISaveStatus
                                  :data="onSubmit.pertanyaan[soalp.id]"
                                  v-if="onSubmit.pertanyaan[soalp.id]"
                                />
                              </div>
                              <div class="form-user px-4 mt-4">
                                <div
                                  class="form-group reg-siswa"
                                  v-if="dataDetail.kategori == 'Asmenas'"
                                >
                                  <label for="template_soal"
                                    >Template Pertanyaan <code>*</code></label
                                  >
                                  <b-form-select
                                    class="form-control pl-0"
                                    id="template_soal"
                                    v-model="soalp.template_pertanyaan"
                                    @change="onUpdatePertanyaan(soalp)"
                                    :options="[
                                      {
                                        text: 'Pilihan Ganda',
                                        value: 'Pilihan Ganda'
                                      },
                                      { text: 'Essay', value: 'Essay' },
                                      {
                                        text: 'Pilihan Ganda Kompleks',
                                        value: 'Pilihan Ganda Kompleks'
                                      },
                                      {
                                        text: 'Isian Singkat',
                                        value: 'Isian Singkat'
                                      },
                                      {
                                        text: 'Menjodohkan',
                                        value: 'Menjodohkan'
                                      }
                                    ]"
                                  >
                                  </b-form-select>
                                </div>
                              </div>
                              <div
                                v-if="
                                  soalp.template_pertanyaan == 'Pilihan Ganda'
                                "
                                class="opsi px-4 d-flex align-items-center py-4"
                              >
                                <p class="mb-0">Opsi Jawaban <code>*</code></p>
                                <button
                                  type="button"
                                  class="btn btn-primary py-1 ml-4"
                                  @click.prevent="addOption(soalp)"
                                >
                                  Tambah Opsi
                                </button>
                              </div>

                              <!-- OPSI JAWABAN -->
                              <div class="px-4 soal">
                                <!-- {{ soalp.opsi_pertanyaan }} -->
                                <!-- {{ soalp.jawaban_pertanyaan }} -->
                                <div
                                  v-if="
                                    soalp.template_pertanyaan == 'Pilihan Ganda'
                                  "
                                >
                                  <!-- <div class="text-danger mb-4 mt-n2">
                                    Jika ingin mengunggah gambar, sebisa mungkin
                                    gunakan gambar berukuran kecil untuk
                                    menghemat resource.
                                  </div> -->
                                  <div
                                    class="row mb-3"
                                    v-for="(opsi, c) in soalp.opsi_pertanyaan"
                                    :key="'C' + c"
                                  >
                                    <div class="col">
                                      <div
                                        class="letter-option"
                                        :class="[
                                          soalp.jawaban_pertanyaan == opsi.uuid
                                            ? 'active'
                                            : ''
                                        ]"
                                      >
                                        <label
                                          :for="
                                            'opsi' +
                                              soalp.id +
                                              '-' +
                                              b +
                                              '-' +
                                              c
                                          "
                                          class="mb-0"
                                          >{{ letterLabel(c) }}</label
                                        >
                                        <input
                                          type="radio"
                                          :id="
                                            'opsi' +
                                              soalp.id +
                                              '-' +
                                              b +
                                              '-' +
                                              c
                                          "
                                          :ref="
                                            'opsi' +
                                              soalp.id +
                                              '-' +
                                              b +
                                              '-' +
                                              c
                                          "
                                          :name="'opsi' + soalp.id + '-' + b"
                                          :value="opsi.uuid"
                                          v-model="soalp.jawaban_pertanyaan"
                                          @change="
                                            onUpdatePertanyaanOpsi(soalp, c)
                                          "
                                        />
                                      </div>
                                    </div>
                                    <div class="col-md-10">
                                      <client-only>
                                        <VueEditor
                                          :id="
                                            'opsi-text-' +
                                              soalp.id +
                                              '-' +
                                              b +
                                              '-' +
                                              c
                                          "
                                          :ref="
                                            'opsi-text-' +
                                              soalp.id +
                                              '-' +
                                              b +
                                              '-' +
                                              c
                                          "
                                          v-model="opsi.option"
                                          :editorOptions="editorOptions"
                                          @blur="onUpdatePertanyaan(soalp)"
                                        />
                                        <div class="d-flex justify-content-end">
                                          <button
                                            class="btn btn-primary btn-sm square btn-add-mathjax"
                                            @click="
                                              addMathJax(
                                                'opsi-text-' +
                                                  soalp.id +
                                                  '-' +
                                                  b +
                                                  '-' +
                                                  c
                                              )
                                            "
                                          >
                                            Add Formula
                                          </button>
                                        </div>
                                      </client-only>
                                    </div>
                                    <div class="col-1 text-left">
                                      <button
                                        type="button"
                                        class="btn btn-danger"
                                        v-if="
                                          c > 3 &&
                                            opsi.uuid !==
                                              soalp.jawaban_pertanyaan
                                        "
                                        @click.prevent="deleteOption(soalp, c)"
                                      >
                                        <i class="fa fa-times"></i>
                                      </button>
                                    </div>
                                  </div>
                                  <UISaveStatus
                                    :data="onSubmit.pertanyaan[soalp.id]"
                                    v-if="onSubmit.pertanyaan[soalp.id]"
                                  />
                                </div>

                                <p class="mt-4">Pembahasan <code>*</code></p>
                                <!-- <textarea
                                  name=""
                                  id="textarea"
                                  cols="30"
                                  rows="10"
                                  class="w-100"
                                  v-model="soalp.pembahasan_pertanyaan"
                                ></textarea> -->
                                <client-only>
                                  <VueEditor
                                    :id="'pembahasan-' + soalp.id + '-' + b"
                                    :ref="'pembahasan-' + soalp.id + '-' + b"
                                    v-model="soalp.pembahasan_pertanyaan"
                                    :editorOptions="editorOptions"
                                    @blur="onUpdatePertanyaan(soalp)"
                                  />
                                  <div class="d-flex justify-content-end">
                                    <button
                                      class="btn btn-primary btn-sm square btn-add-mathjax"
                                      @click="
                                        addMathJax(
                                          'pembahasan-' + soalp.id + '-' + b
                                        )
                                      "
                                    >
                                      Add Formula
                                    </button>
                                  </div>
                                </client-only>
                                <UISaveStatus
                                  :data="onSubmit.pertanyaan[soalp.id]"
                                  v-if="onSubmit.pertanyaan[soalp.id]"
                                />

                                <button
                                  type="button"
                                  class="btn btn-success py-1 mt-3"
                                  @click.prevent="addQuestion(soalp)"
                                  v-if="soalp.pertanyaan_child.length == 0"
                                  :disabled="loading"
                                >
                                  <b-spinner
                                    small
                                    type="grow"
                                    class="mr-1"
                                    v-if="loading"
                                  ></b-spinner>
                                  Tambah Pertanyaan
                                </button>
                              </div>
                              <!-- ./OPSI JAWABAN -->
                            </div>

                            <!-- SOAL PERTANYAAN - CHILD -->
                            <div
                              class="card-body-content-dua dua"
                              v-for="(child, d) in soalp.pertanyaan_child"
                              :key="'D' + d"
                              :id="'pertanyaan-' + child.nomor"
                            >
                              <div class="col-md-12 px-4 py-2 soal mt-2">
                                <div class="header-soal">
                                  <p style="font-weight: bold">
                                    Pertanyaan {{ child.nomor }} <code>*</code>
                                  </p>
                                  <!-- <button
                                    type="button"
                                    class="btn btn-danger dua py-1"
                                  >
                                    Hapus Pertanyaan
                                  </button> -->
                                  <button
                                    type="button"
                                    class="btn btn-danger dua py-1"
                                    @click.prevent="
                                      deleteQuestion(soalp.pertanyaan_child, d)
                                    "
                                    :disabled="loading"
                                  >
                                    <b-spinner
                                      v-if="loading"
                                      type="grow"
                                      small
                                      class="mr-1"
                                    ></b-spinner>
                                    Hapus Pertanyaan
                                  </button>
                                </div>
                                <!-- <textarea
                                  name=""
                                  id="textarea"
                                  cols="30"
                                  rows="10"
                                  class="w-100"
                                  v-model="child.soal"
                                ></textarea> -->
                                <client-only>
                                  <VueEditor
                                    :id="
                                      'soal-' + child.id + '-' + b + ' - ' + d
                                    "
                                    :ref="
                                      'soal-' + child.id + '-' + b + ' - ' + d
                                    "
                                    v-model="child.soal"
                                    :editorOptions="editorOptions"
                                    @blur="onUpdatePertanyaanChild(child)"
                                  />
                                  <div class="d-flex justify-content-end">
                                    <button
                                      class="btn btn-primary btn-sm square btn-add-mathjax"
                                      @click="
                                        addMathJax(
                                          'soal-' +
                                            child.id +
                                            '-' +
                                            b +
                                            ' - ' +
                                            d
                                        )
                                      "
                                    >
                                      Add Formula
                                    </button>
                                  </div>
                                </client-only>
                                <UISaveStatus
                                  :data="onSubmit.perchild[child.id]"
                                  v-if="onSubmit.perchild[child.id]"
                                />
                              </div>

                              <!-- CHILD OPSI JAWABAN -->
                              <div
                                class="opsi px-4 d-flex align-items-center py-4"
                              >
                                <p class="mb-0">Opsi Jawaban <code>*</code></p>
                                <button
                                  type="button"
                                  class="btn btn-primary py-1 ml-4"
                                  @click.prevent="addChildOption(child)"
                                >
                                  Tambah Opsi
                                </button>
                              </div>

                              <div class="px-4 soal">
                                <div
                                  class="row mb-3"
                                  v-for="(opsi_child,
                                  d) in child.opsi_pertanyaan"
                                  :key="'D' + d"
                                >
                                  <div class="col-md-1">
                                    <div
                                      class="letter-option"
                                      :class="[
                                        child.jawaban_pertanyaan ==
                                        opsi_child.uuid
                                          ? 'active'
                                          : ''
                                      ]"
                                    >
                                      <label
                                        :for="
                                          'opsi-' + child.id + '-' + b + '-' + d
                                        "
                                        class="mb-0"
                                        >{{ letterLabel(d) }}</label
                                      >
                                      <input
                                        type="radio"
                                        :id="
                                          'opsi-' + child.id + '-' + b + '-' + d
                                        "
                                        :ref="
                                          'opsi-' + child.id + '-' + b + '-' + d
                                        "
                                        :name="
                                          'opsi-' + child.id + '-' + b + '-' + d
                                        "
                                        :value="opsi_child.uuid"
                                        v-model="child.jawaban_pertanyaan"
                                        @change="
                                          onUpdatePertanyaanOpsi(child, d)
                                        "
                                      />
                                    </div>
                                  </div>
                                  <div class="col-md-10">
                                    <client-only>
                                      <VueEditor
                                        :id="
                                          'opsi-text-' +
                                            child.id +
                                            '-' +
                                            b +
                                            '-' +
                                            d
                                        "
                                        :ref="
                                          'opsi-text-' +
                                            child.id +
                                            '-' +
                                            b +
                                            '-' +
                                            d
                                        "
                                        :name="
                                          'opsi-text-' +
                                            child.id +
                                            '-' +
                                            b +
                                            '-' +
                                            d
                                        "
                                        v-model="opsi_child.option"
                                        :editorOptions="editorOptions"
                                        @blur="onUpdatePertanyaan(child)"
                                      />
                                      <div class="d-flex justify-content-end">
                                        <button
                                          class="btn btn-primary btn-sm square btn-add-mathjax"
                                          @click="
                                            addMathJax(
                                              'opsi-text-' +
                                                child.id +
                                                '-' +
                                                b +
                                                '-' +
                                                d
                                            )
                                          "
                                        >
                                          Add Formula
                                        </button>
                                      </div>
                                    </client-only>
                                  </div>
                                  <div class="col-md-1 text-left">
                                    <button
                                      type="button"
                                      class="btn btn-danger"
                                      v-if="
                                        d > 3 &&
                                          opsi_child.correct !==
                                            child.jawaban_pertanyaan
                                      "
                                      @click.prevent="deleteOption(child, d)"
                                    >
                                      <i class="fa fa-times"></i>
                                    </button>
                                  </div>
                                </div>

                                <UISaveStatus
                                  :data="onSubmit.perchild[child.id]"
                                  v-if="onSubmit.perchild[child.id]"
                                />

                                <p class="mt-4">Pembahasan <code>*</code></p>
                                <!-- <textarea
                                  name=""
                                  id="textarea"
                                  cols="30"
                                  rows="10"
                                  class="w-100"
                                  v-model="child.pembahasan_pertanyaan"
                                ></textarea> -->
                                <client-only>
                                  <VueEditor
                                    :id="
                                      'pembahasan-' +
                                        child.id +
                                        '-' +
                                        b +
                                        '-' +
                                        d
                                    "
                                    :ref="
                                      'pembahasan-' +
                                        child.id +
                                        '-' +
                                        b +
                                        '-' +
                                        d
                                    "
                                    v-model="child.pembahasan_pertanyaan"
                                    :editorOptions="editorOptions"
                                    @blur="onUpdatePertanyaan(child)"
                                  />
                                  <div class="d-flex justify-content-end">
                                    <button
                                      class="btn btn-primary btn-sm square btn-add-mathjax"
                                      @click="
                                        addMathJax(
                                          'pembahasan-' +
                                            child.id +
                                            '-' +
                                            b +
                                            '-' +
                                            d
                                        )
                                      "
                                    >
                                      Add Formula
                                    </button>
                                  </div>
                                </client-only>
                                <UISaveStatus
                                  :data="onSubmit.perchild[child.id]"
                                  v-if="onSubmit.perchild[child.id]"
                                />

                                <button
                                  type="button"
                                  class="btn btn-success py-1 mt-3"
                                  v-if="soalp.pertanyaan_child.length == d + 1"
                                  @click.prevent="addQuestion(soalp)"
                                  :disabled="loading"
                                >
                                  <b-spinner
                                    small
                                    type="grow"
                                    class="mr-1"
                                    v-if="loading"
                                  ></b-spinner>
                                  Tambah Pertanyaan
                                </button>
                              </div>
                              <!-- ./ CHILD - OPSI JAWABAN -->
                            </div>
                            <!-- / SOAL PERTANYAAN - CHILD -->

                            <div class="dashboard soal pt-0">
                              <button
                                type="button"
                                class="btn btn-info py-1 mt-4"
                                @click.prevent="
                                  addBabMapel(soalp, soal.pertanyaan)
                                "
                                v-if="b == soal.pertanyaan.length - 1"
                                :disabled="loading"
                              >
                                <b-spinner
                                  small
                                  type="grow"
                                  class="mr-1"
                                  v-if="loading"
                                ></b-spinner>

                                Tambah Bab Mata Pelajaran
                              </button>
                            </div>
                          </div>
                        </template>
                        <!-- ./SOAL PERTANYAAN -->

                        <button
                          type="button"
                          class="btn btn-warning tambah py-1 mt-4"
                          v-if="
                            a == formSoal.length - 1 &&
                              soal.pertanyaan.length > 0
                          "
                          :disabled="loading"
                          @click.prevent="
                            addNewMapel = true;
                            newMapel.jenis_soal = soal.jenis_soal;
                            newMapel.kelompok_soal = soal.kelompok_soal;
                          "
                        >
                          <b-spinner
                            small
                            type="grow"
                            class="mr-1"
                            v-if="loading"
                          ></b-spinner>
                          Tambah Mata Pelajaran
                        </button>
                        <button
                          type="button"
                          class="btn btn-warning tambah py-1 mt-4"
                          v-if="
                            dataDetail.jenis_soal == 'Campuran' &&
                              soal.pertanyaan.length > 0
                          "
                          :disabled="loading"
                          @click.prevent="
                            addNewMapel = true;
                            newMapel.jenis_soal = soal.jenis_soal;
                            newMapel.kelompok_soal = soal.kelompok_soal;
                          "
                        >
                          <b-spinner
                            small
                            type="grow"
                            class="mr-1"
                            v-if="loading"
                          ></b-spinner>
                          Tambah Mata Pelajaran
                        </button>
                      </div>
                    </div>
                  </b-collapse>
                </b-card>

                <b-card class="mt-4" body-class="pb-4">
                  <button
                    type="button"
                    class="btn btn-warning tambah py-1 mt-4"
                    :disabled="loading"
                    @click.prevent="
                      addNewMapel = true;
                      newMapel.jenis_soal = dataDetail.jenis_soal;
                      newMapel.kelompok_soal = dataDetail.kelompok_soal;
                    "
                  >
                    <b-spinner
                      small
                      type="grow"
                      class="mr-1"
                      v-if="loading"
                    ></b-spinner>
                    Tambah Mata Pelajaran
                  </button>
                </b-card>

                <!-- Add New Mapel -->
                <b-card class="pt-4 pb-2 mt-4" v-if="addNewMapel">
                  <h3 class="card-title h4 py-3">
                    Tambah Mata Pelajaran Baru
                    <!-- a -->
                  </h3>
                  <div class="card-body-content">
                    <div class="col-md-12 form-user form-pilih-kelas p-0 mt-3">
                      <div class="form-group reg-siswa">
                        <label for="id_mapel"
                          >Mata Pelajaran <code>*</code></label
                        >
                        <select
                          class="form-control pl-0"
                          id="id_mapel"
                          v-model="newMapel.id_mapel"
                        >
                          <option :value="null">-- Pilih --</option>
                          <option
                            :value="mapel.id"
                            v-for="(mapel, m) in dataMaster['mapel']"
                            :key="m"
                            >{{ mapel.nama_mapel }}</option
                          >
                        </select>
                      </div>
                      <div class="form-group reg-siswa">
                        <div class="row">
                          <div class="col-md-2">
                            <label for="jumlah_soal"
                              >Jumlah Soal <code>*</code></label
                            >
                          </div>
                          <div class="col-md-8">
                            <input
                              type="text"
                              class="form-control"
                              id="jumlah_soal"
                              v-model="newMapel.jumlah_soal"
                            />
                          </div>
                        </div>
                      </div>
                          <div class="form-group reg-siswa">
                            <label for="jeda_waktu_antar_mapel"
                              >Alokasi Waktu Per-Mata Pelajaran (Detik) <code>*</code></label
                            >
                            <input
                              type="text"
                              class="form-control pl-0"
                              id="jeda_waktu_antar_mapel"
                              placeholder="Ex: 80"
                              v-model="newMapel.alokasi_waktu_per_mapel"
                              
                            />
                          </div>
                          <div class="form-group reg-siswa">
                            <label for="jeda_waktu_antar_mapel"
                              >Jeda Waktu Dengan Mata Pelajaran Berikutnya (Detik) <code>*</code></label
                            >
                            <input
                              type="text"
                              class="form-control pl-0"
                              id="jeda_waktu_antar_mapel"
                              placeholder="Ex: 30"
                              v-model="newMapel.jeda_waktu_antar_mapel"
                            />
                          </div>
                      <div class="d-flex">
                        <button
                          type="button"
                          class="btn btn-primary mr-2"
                          @click.prevent="addMapel()"
                          :disabled="loading"
                        >
                          <b-spinner
                            v-if="loading"
                            type="grow"
                            small
                            class="mr-1"
                          ></b-spinner>
                          Tambah Mata Pelajaran
                        </button>
                        <button
                          type="button"
                          class="btn btn-outline-primary"
                          @click.prevent="addNewMapel = false; resetNewMapel()"
                        >
                          <b-icon icon="x" class="mr-1"></b-icon>
                          Batal
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- {{ newMapel }} -->
                </b-card>
                <!-- ./ Add New Mapel -->
              </div>
            </div>
          </div>
        </div>
        <div class="crud-footer d-flex justify-content-end mt-4">
          <nuxt-link
            to="/administrator/tryout"
            class="btn btn-outline-secondary mr-2"
          >
            Kembali
          </nuxt-link>
          <!-- <button type="submit" class="btn btn-primary" :disabled="loading">
            <b-spinner small class="mr-1" v-if="loading"></b-spinner>
            Simpan Soal
          </button> -->
        </div>
      </div>
    </form>
    <div class="floating-pagination">
      <div class="text-center small mb-1">Navigation:</div>
      <!-- v-if="totalRows > 0 && totalRows > filter.perPage && !loading" -->
      <b-pagination
        class="pagination-table"
        v-if="!loading"
        v-model="filter.page"
        :total-rows="filter.totalNumber"
        :per-page="filter.perPage"
      >
      </b-pagination>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  layout: "admin",
  fetchOnServer: false,
  data() {
    return {
      loading: true,
      refetch: false,
      tab: 0,
      // customToolbar: [["bold", "italic", "underline"], [{ list: "bullet" }], ['code-block']],
      editorOptions: {
        modules: {
          imageResize: {
            modules: ["Resize", "DisplaySize", "Toolbar"],
            handleStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            },
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            }
          },
          mathjax: true
        }
      },
      formTryout: {
        panduan_pengerjaan: "",
        kategori: "",
        deskripsi: "",
        judul: ""
      },
      formSoal: [],
      dataDetail: {},
      dataMaster: { mapel: [] },
      onSubmit: {
        panduan: {
          loading: false,
          submitted: false,
          success: false
        },
        soal: [{ loading: false, submitted: false, success: false }],
        pertanyaan: [{ loading: false, submitted: false, success: false }],
        perchild: [{ loading: false, submitted: false, success: false }]
      },
      addNewMapel: false,
      newMapel: {
        id_mapel: null,
        // alokasi_waktu_per_mapel: null,
        jeda_waktu_antar_mapel: null,
        alokasi_waktu_per_mapel: null,
        jenis_soal: null,
        kelompok_soal: null,
        jumlah_soal: 25
      },
      test: "",
      visible: true,
      filter: {
        page: 1,
        totalNumber: 20,
        perPage: 1,
        numberInSubtest: 0
      },
      numberSubtest: []
    };
  },
  async mounted() {
    if (!this.$route.params.id)
      return this.$router.push("/administrator/tryout");

    this.$store.commit("modifyBreadcrumb", [
      {
        text: "Tryout",
        href: "/administrator/tryout"
      },
      {
        text: "Soal"
      },
      {
        text: "Create",
        active: true
      }
    ]);
    await this.getDetail("tryout", this.$route.params.id);
    this.getData("mapel");
  },
  watch: {
    "filter.page": async function(number) {
      if (number) {
        const baseUrl = window.location.origin + window.location.pathname;

        const subtestPosition = this.numberSubtest.findIndex(item =>
          item.includes(number)
        );

        if (this.tab != subtestPosition) {
          this.tab = subtestPosition;
          this.visible = true;
          await this.$nextTick(async () => {
            await this.delay(360);
            window.location.href = baseUrl + "#pertanyaan-" + number;
          });
        } else {
          window.location.href = baseUrl + "#pertanyaan-" + number;
        }
      }
    }
  },
  methods: {
    parseJSON(str) {
      try {
        return JSON.parse(str)
      } catch (err) {
        return str
      }
    },
    delay: ms =>
      new Promise(res => {
        setTimeout(res, ms);
      }),
    updateAccordion(a) {
      // console.log(a)
      if (this.tab != a) {
        this.visible = true;
        this.tab = a;
      } else {
        this.visible = !this.visible;
      }
      console.log(this.tab);
      console.log(this.visible);
    },
    addMathJax(ref) {
      console.log(this.$refs[ref]);
      let refElement = this.$refs[ref];
      if (!refElement) return;
      let editor = refElement.quill;
      if (!editor) {
        editor = refElement[0].quill;
      }
      const latex = prompt("Enter a LaTeX formula:", "e=mc^2");
      const range = editor.getSelection(true);
      editor.deleteText(range.index, range.length);
      editor.insertEmbed(range.index, "mathjax", latex);
      editor.insertText(range.index + range.length + 1, " ");
      editor.setSelection(range.index + range.length + 1);
    },
    async getDetail(type, id) {
      this.loading = true;
      await this.$axios
        .$get(`/api/${type}/find/${id}/detail`)
        .then(async res => {
          console.log(res);
          if (res.success) {
            this.dataDetail = await res.data;
            this.formSoal = res.data.soal.map(s => ({
              ...s,
              pertanyaan: s.pertanyaan.map(p => ({
                ...p,
                bab_mapel: this.parseJSON(p.bab_mapel)
              }))
            }));
            this.formTryout = { ...this.dataDetail };
            this.filter.totalNumber = res.totalNomor;
            this.filter.numberInSubtest = 0;
            this.numberSubtest = res.nomorSubtest;
            this.loading = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
          this.loading = false;
        });
      // .finally(() => (this.loading = false));
    },
    async refecthSoal() {
      this.refetch = true;
      await this.$axios
        .$get(`/api/tryout/find/${this.$route.params.id}/soal`)
        .then(async res => {
          console.log(res);
          if (res.success) {
            // this.dataDetail = await res.data;
            this.formSoal = res.data;
            // this.formTryout = { ...this.dataDetail };
            this.filter.totalNumber = res.totalNomor;
            this.filter.numberInSubtest = 0;
            this.numberSubtest = res.nomorSubtest;
            this.refetch = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
          this.refetch = false;
        });
    },
    getData(type, params = {}) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}`, {
          params: {
            q: params.keyword ?? "",
            paginate: params.perPage ?? 99,
            page: params.page ?? 1
          }
        })
        .then(async res => {
          console.log("getMaster" + type, res);
          if (res.success) {
            this.dataMaster[type] = await res.data.data;
            this.loading = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
          this.loading = false;
        });
      // .finally(() => (this.loading = false));
    },
    validateForm() {
      console.log(this.formTryout);
      console.log(this.formSoal);
      return;
      // if (!this.form.nama_mapel) {
      //   this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
      //     title: "Peringatan",
      //     variant: "warning",
      //     solid: true,
      //     autoHideDelay: 2000
      //   });
      //   return;
      // }
      this.submitData("mapel");
    },
    submitData(type) {
      this.loading = true;
      this.$axios
        .$post(`/api/${type}/create`, this.form)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast("Data " + type + " berhasil ditambah.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.$router.replace("/administrator/master_mapel");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    resetNewMapel() {
      this.newMapel = {
        id_mapel: null,
        // alokasi_waktu_per_mapel: null,
        // jeda_waktu_antar_mapel: null,
        jenis_soal: null,
        kelompok_soal: null
      };
    },
    addMapel() {
      if (
        !this.newMapel.id_mapel
        // ||
        // !this.newMapel.jeda_waktu_antar_mapel ||
        // !this.newMapel.alokasi_waktu_per_mapel
      ) {
        this.showToastMessage(
          "Mohon pilih mata pelajaran terlebih dahulu!",
          "warning"
        );
        return;
      }
      let dataMapelBaru;
      if (this.dataDetail.jenis_soal == "Campuran") {
        dataMapelBaru = {
          ...this.newMapel,
          id_tryout: this.dataDetail.id
        };
      } else {
        dataMapelBaru = {
          ...this.newMapel,
          kelompok_soal: this.dataDetail.kelompok_soal,
          jenis_soal: this.dataDetail.jenis_soal,
          id_tryout: this.dataDetail.id
        };
      }
      // console.log(dataMapelBaru);
      // return;
      this.loading = true;
      this.$axios
        .$post(`/api/tryout/soal/create`, dataMapelBaru)
        .then(res => {
          console.log("added new mapel", res);
          if (res.success) {
            if (this.newMapel.jumlah_soal > 0) {
              this.formSoal.push({
                ...res.data,
                pertanyaan: res.new_soal.map(item => {
                  return {
                    ...item,
                    pertanyaan_child: []
                  };
                })
              });
            } else {
              this.formSoal.push({ ...res.data, pertanyaan: [] });
            }
            this.showToastMessage(
              "Mata pelajaran berhasil ditambah!",
              "success"
            );

            // re-fetch detail tryout
            this.refecthSoal();
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => {
          this.loading = false;
          this.addNewMapel = false;
          this.newMapel = {
            id_mapel: null,
            // alokasi_waktu_per_mapel: null,
            // jeda_waktu_antar_mapel: null
            jumlah_soal: 25
          };
        });
    },
    deleteMapel(soal_id, index_soal) {
      const r = confirm("Apakah Anda yakin ingin menghapus Mapel ini?");
      if (!r) return;

      this.loading = true;
      this.$axios
        .$delete(`/api/tryout/soal/delete/${soal_id}`)
        .then(res => {
          console.log("delete mapel", res);
          if (res.success) {
            this.formSoal.splice(index_soal, 1);
            this.showToastMessage("Mata pelajaran berhasil dihapus!", "danger");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          if (
            err.response &&
            err.response.status == 500 &&
            err.response.data.line == 703
          ) {
            this.showToastMessage(
              "Mata pelajaran gagal dihapus karena soal sudah terdaftar pada Tryout Siswa! Silakan buat tryout baru.",
              "danger",
              5000
            );
            return null;
          }
          this.catchError(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    createBab(id_soal, ref) {
      if (
        !ref.id_mapel ||
        // !ref.alokasi_waktu_per_mapel ||
        // !ref.jeda_waktu_antar_mapel ||
        !this.formTryout.panduan_pengerjaan
      ) {
        this.showToastMessage(
          "Mohon pilih mata pelajaran dan isi panduan pengerjaan terlebih dahulu!"
        );
        return;
      }
      const jawaban = uuidv4();
      const dataSoalTryout = {
        id_soal_tryout: id_soal,
        bab_mapel: ["Bab Test"],
        penjelasan_pertanyaan: "",
        template_pertanyaan: this.dataDetail.template_soal ?? "Pilihan Ganda",
        soal: "Apa arti kehidupan di dunia ini?",
        opsi_pertanyaan: [
          {
            uuid: jawaban,
            option: "Opsi A"
          },
          {
            uuid: uuidv4(),
            option: "Opsi B"
          },
          {
            uuid: uuidv4(),
            option: "Opsi C"
          },
          {
            uuid: uuidv4(),
            option: "Opsi D"
          },
          {
            uuid: uuidv4(),
            option: "Opsi E"
          }
        ],
        jawaban_pertanyaan: jawaban,
        pembahasan_pertanyaan: "Ini Pembahasan Pertanyaan....",
        parent_soal_pertanyaan: null
      };
      dataSoalTryout.jawaban_pertanyaan =
        dataSoalTryout.opsi_pertanyaan[0].uuid;
      this.loading = true;
      this.$axios
        .$post(`/api/soal/pertanyaan/create`, dataSoalTryout)
        .then(res => {
          console.log("createBab", res);
          if (res.success) {
            ref.pertanyaan.push({ ...res.data, pertanyaan_child: [] });
            this.showToastMessage("Pertanyaan berhasil dibuat!", "success");
            this.$axios
              .$put(`/api/tryout/update/${this.dataDetail.id}`, this.formTryout)
              .catch(err => this.catchError(err));
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    addOption(pertanyaan) {
      // console.log('pertanyaan', pertanyaan)
      if (!this.onSubmit.pertanyaan[pertanyaan.id]) {
        this.onSubmit.pertanyaan[pertanyaan.id] = {};
      }
      pertanyaan.opsi_pertanyaan.push({
        uuid: uuidv4(),
        option: "Opsi Baru"
      });
      this.onSubmit.pertanyaan[pertanyaan.id].loading = true;
      this.$axios
        .$put(`/api/soal/pertanyaan/update/${pertanyaan.id}`, pertanyaan)
        .then(res => {
          if (res.success) {
            this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
            this.onSubmit.pertanyaan[pertanyaan.id].success = true;
            this.onSubmit.pertanyaan[pertanyaan.id].loading = false;
          }
        })
        .catch(err => {
          this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
          this.onSubmit.pertanyaan[pertanyaan.id].success = false;
          this.catchError(err);
        })
        .finally(() => {
          this.onSubmit.pertanyaan[pertanyaan.id].loading = false;
        });
    },
    addChildOption(perchild) {
      // console.log('perchild', perchild);
      if (!this.onSubmit.perchild[perchild.id]) {
        this.onSubmit.perchild[perchild.id] = {};
      }
      this.onSubmit.perchild[perchild.id].loading = true;
      perchild.opsi_pertanyaan.push({
        uuid: uuidv4(),
        option: "Opsi Baru"
      });
      this.$axios
        .$put(`/api/soal/pertanyaan/update/${perchild.id}`, perchild)
        .then(res => {
          if (res.success) {
            this.onSubmit.perchild[perchild.id].submitted = true;
            this.onSubmit.perchild[perchild.id].success = true;
            this.onSubmit.perchild[perchild.id].loading = false;
          }
        })
        .catch(err => {
          this.onSubmit.perchild[perchild.id].submitted = true;
          this.onSubmit.perchild[perchild.id].success = false;
          this.catchError(err);
        })
        .finally(() => {
          this.onSubmit.perchild[perchild.id].loading = false;
        });
    },
    deleteOption(pertanyaan, index) {
      if (!this.onSubmit.pertanyaan[pertanyaan.id]) {
        this.onSubmit.pertanyaan[pertanyaan.id] = {};
      }
      this.onSubmit.pertanyaan[pertanyaan.id].loading = true;
      this.$axios
        .$put(`/api/soal/pertanyaan/update/${pertanyaan.id}`, pertanyaan)
        .then(res => {
          if (res.success) {
            this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
            this.onSubmit.pertanyaan[pertanyaan.id].success = true;
            this.onSubmit.pertanyaan[pertanyaan.id].loading = false;
            pertanyaan.opsi_pertanyaan.splice(index, 1);
          }
          return true;
        })
        .catch(err => {
          this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
          this.onSubmit.pertanyaan[pertanyaan.id].success = false;
          this.catchError(err);
        })
        .finally(() => {
          this.onSubmit.pertanyaan[pertanyaan.id].loading = false;
        });
    },
    addQuestion(pertanyaan) {
      // console.log(pertanyaan);
      if (!this.onSubmit.pertanyaan[pertanyaan.id]) {
        this.onSubmit.pertanyaan[pertanyaan.id] = {};
      }
      this.onSubmit.pertanyaan[pertanyaan.id].loading = true;

      const jawaban = uuidv4();
      const dataSave = {
        id_soal_tryout: pertanyaan.id_soal_tryout,
        bab_mapel: ["Bab Test"],
        penjelasan_pertanyaan: null,
        template_pertanyaan: this.dataDetail.template_soal ?? "Pilihan Ganda",
        soal: "Pertanyaaaannya???",
        gambar: null,
        opsi_pertanyaan: [
          {
            uuid: jawaban,
            option: "Opsi A"
          },
          {
            uuid: uuidv4(),
            option: "Opsi B"
          },
          {
            uuid: uuidv4(),
            option: "Opsi C"
          },
          {
            uuid: uuidv4(),
            option: "Opsi D"
          },
          {
            uuid: uuidv4(),
            option: "Opsi E"
          }
        ],
        jawaban_pertanyaan: jawaban,
        pembahasan_pertanyaan: "Pembahasan pertanyaan...",
        parent_soal_pertanyaan: pertanyaan.id,
        pertanyaan_child: []
      };

      dataSave.jawaban_pertanyaan = dataSave.opsi_pertanyaan[0].uuid;

      this.loading = true;
      this.$axios
        .$post(`/api/soal/pertanyaan/create`, dataSave)
        .then(res => {
          if (res.success) {
            this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
            this.onSubmit.pertanyaan[pertanyaan.id].success = true;
            this.onSubmit.pertanyaan[pertanyaan.id].loading = false;
            pertanyaan.pertanyaan_child.push({ ...dataSave, id: res.data.id });
          }
          return true;
        })
        .catch(err => {
          this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
          this.onSubmit.pertanyaan[pertanyaan.id].success = false;
          this.catchError(err);
        })
        .finally(() => {
          this.loading = false;
          this.onSubmit.pertanyaan[pertanyaan.id].loading = false;

          // refetch soal
          this.refecthSoal();
        });
    },
    deleteQuestion(items, index) {
      if (!items[index]) {
        return;
      }
      const r = confirm(
        "Apakah anda yakin ingin menghapus soal beserta data yang berelasi padanya? Data yang dihapus tidak dapat dikembalikan."
      );
      if (!r) return;

      const id = items[index].id;
      this.loading = true;
      this.$axios
        .$delete(`/api/soal/pertanyaan/delete/${id}`)
        .then(res => {
          if (res.success) {
            items.splice(index, 1);
          }
          return true;
        })
        .catch(err => {
          this.catchError(err);
        })
        .finally(() => {
          this.loading = false;
          // refetch soal
          this.refecthSoal();
        });
    },
    addBabMapel(pertanyaan, pertanyaan_parent) {
      // console.log(pertanyaan);
      // return;
      const jawaban = uuidv4();
      const dataSave = {
        id_soal_tryout: pertanyaan.id_soal_tryout,
        bab_mapel: ["Bab Test"],
        penjelasan_pertanyaan: "",
        template_pertanyaan: this.dataDetail.template_soal ?? "Pilihan Ganda",
        soal: "Pertanyaaaannya???",
        gambar: null,
        opsi_pertanyaan: [
          {
            uuid: jawaban,
            option: "Opsi A"
          },
          {
            uuid: uuidv4(),
            option: "Opsi B"
          },
          {
            uuid: uuidv4(),
            option: "Opsi C"
          },
          {
            uuid: uuidv4(),
            option: "Opsi D"
          },
          {
            uuid: uuidv4(),
            option: "Opsi E"
          }
        ],
        jawaban_pertanyaan: jawaban,
        pembahasan_pertanyaan: "Pembahasan pertanyaan...",
        parent_soal_pertanyaan: null,
        pertanyaan_child: []
      };

      dataSave.jawaban_pertanyaan = dataSave.opsi_pertanyaan[0].uuid;

      this.loading = true;
      this.$axios
        .$post(`/api/soal/pertanyaan/create`, dataSave)
        .then(res => {
          console.log("res add data mapel", res);
          if (res.success) {
            pertanyaan_parent.push({ ...dataSave, id: res.data.id });
          }
          return true;
        })
        .catch(err => {
          this.catchError(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    deleteBabMapel(items, index) {
      if (!items[index]) {
        return;
      }
      const r = confirm(
        "Apakah anda yakin ingin menghapus Bab Mata Pelajaran ini beserta data yang berelasi padanya? Data yang dihapus tidak dapat dikembalikan."
      );
      if (!r) return;

      const id = items[index].id;
      this.loading = true;
      this.$axios
        .$delete(`/api/soal/pertanyaan/delete/${id}`)
        .then(res => {
          if (res.success) {
            items.splice(index, 1);
          }
          return true;
        })
        .catch(err => {
          this.catchError(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // on Update Input
    onBlurPanduan(quill) {
      console.log(this.formTryout);
      this.onSubmit.panduan.loading = true;
      this.$axios
        .$put(`/api/tryout/update/${this.dataDetail.id}/panduan`, {
          panduan_pengerjaan: this.formTryout.panduan_pengerjaan
        })
        .then(res => {
          if (res.success) {
            this.onSubmit.panduan.submitted = true;
            this.onSubmit.panduan.success = true;
          }
          return true;
        })
        .catch(err => {
          this.onSubmit.panduan.submitted = true;
          this.onSubmit.panduan.success = false;
          this.catchError(err);
        })
        .finally(() => {
          this.onSubmit.panduan.loading = false;
          // console.log(this.onSubmit.panduan);
        });
    },
    onUpdateSoal(soal) {
      if (!this.onSubmit.soal[soal.id]) {
        this.onSubmit.soal[soal.id] = {};
      }
      this.onSubmit.soal[soal.id].loading = true;
      this.$axios
        .$put(`/api/tryout/soal/update/${soal.id}`, soal)
        .then(res => {
          if (res.success) {
            this.onSubmit.soal[soal.id].submitted = true;
            this.onSubmit.soal[soal.id].success = true;
          }
          return true;
        })
        .catch(err => {
          this.onSubmit.soal[soal.id].submitted = true;
          this.onSubmit.soal[soal.id].success = false;
          this.catchError(err);
        })
        .finally(() => {
          this.onSubmit.soal[soal.id].loading = false;
          // console.log(this.onSubmit.soal[soal.id]);
        });
    },
    onUpdatePertanyaan(pertanyaan) {
      // console.log(pertanyaan);
      // if (
      //   pertanyaan.template_pertanyaan == "Pilihan Ganda Kompleks" &&
      //   !Array.isArray(pertanyaan.jawaban_pertanyaan)
      // ) {
      //   pertanyaan.jawaban_pertanyaan = [pertanyaan.jawaban_pertanyaan];
      // } else {
      //   pertanyaan.jawaban_pertanyaan = pertanyaan.opsi_pertanyaan[0]
      //     ? pertanyaan.opsi_pertanyaan[0].uuid
      //     : pertanyaan.jawaban_pertanyaan;
      // }

      if (!this.onSubmit.pertanyaan[pertanyaan.id]) {
        this.onSubmit.pertanyaan[pertanyaan.id] = {};
      }
      this.onSubmit.pertanyaan[pertanyaan.id].loading = true;
      this.$axios
        .$put(`/api/soal/pertanyaan/update/${pertanyaan.id}`, pertanyaan)
        .then(res => {
          if (res.success) {
            this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
            this.onSubmit.pertanyaan[pertanyaan.id].success = true;
            this.onSubmit.pertanyaan[pertanyaan.id].loading = false;
          }
          return true;
        })
        .catch(err => {
          this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
          this.onSubmit.pertanyaan[pertanyaan.id].success = false;
          this.catchError(err);
        })
        .finally(() => {
          this.onSubmit.pertanyaan[pertanyaan.id].loading = false;
        });
    },
    onUpdatePertanyaanChild(perchild) {
      if (!this.onSubmit.perchild[perchild.id]) {
        this.onSubmit.perchild[perchild.id] = {};
      }
      this.onSubmit.perchild[perchild.id].loading = true;
      this.$axios
        .$put(`/api/soal/pertanyaan/update/${perchild.id}`, perchild)
        .then(res => {
          if (res.success) {
            this.onSubmit.perchild[perchild.id].submitted = true;
            this.onSubmit.perchild[perchild.id].success = true;
            this.onSubmit.perchild[perchild.id].loading = false;
          }
          return true;
        })
        .catch(err => {
          this.onSubmit.perchild[perchild.id].submitted = true;
          this.onSubmit.perchild[perchild.id].success = false;
          this.catchError(err);
        })
        .finally(() => {
          this.onSubmit.perchild[perchild.id].loading = false;
        });
    },
    onUpdatePertanyaanOpsi(pertanyaan, index) {
      if (!this.onSubmit.pertanyaan[pertanyaan.id]) {
        this.onSubmit.pertanyaan[pertanyaan.id] = {};
      }
      // const newPertanyaan = { ...pertanyaan };
      // for (let i = 0; i < pertanyaan.opsi_pertanyaan.length; i++) {
      //   pertanyaan.opsi_pertanyaan[i] = {
      //     ...pertanyaan.opsi_pertanyaan[i],
      //     correct: false
      //   };
      // }
      // pertanyaan.opsi_pertanyaan[index] = {
      //   option: pertanyaan.opsi_pertanyaan[index].option,
      //   correct: true
      // };
      // pertanyaan.jawaban_pertanyaan = pertanyaan.opsi_pertanyaan[index];

      this.onSubmit.pertanyaan[pertanyaan.id].loading = true;
      this.$axios
        .$put(`/api/soal/pertanyaan/update/${pertanyaan.id}`, pertanyaan)
        .then(res => {
          if (res.success) {
            this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
            this.onSubmit.pertanyaan[pertanyaan.id].success = true;
            this.onSubmit.pertanyaan[pertanyaan.id].loading = false;
            // pertanyaan = { ...res.data };
          }
          return true;
        })
        .catch(err => {
          this.onSubmit.pertanyaan[pertanyaan.id].submitted = true;
          this.onSubmit.pertanyaan[pertanyaan.id].success = false;
          this.catchError(err);
        })
        .finally(() => {
          this.onSubmit.pertanyaan[pertanyaan.id].loading = false;
        });
    },
    letterLabel(index) {
      const letters = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "O"
      ];
      return letters[index] ?? "-";
    }
  }
};
</script>
