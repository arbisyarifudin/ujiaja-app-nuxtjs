<template>
  <div class="section fitur-layanan">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2 style="text-align: center">{{ props.judul }}</h2>
          <p style="text-align: center">
            {{props.description}}
          </p>
          <div class="row">
            <div class="col-lg-9 col-md-12">
              <div class="row">
                <div class="col-md-4 mb-4">
                  <CardGrad :lg="'top-bottom'" class="fitur">
                    <div class="text-center">
                      <img :src="formatImageSource(props.item[0].gambar)" class="mb-4 img-fluid" />
                    </div>
                    <h4>{{ props.item[0].judul }}</h4>
                    <div class="fitur-text" v-html="props.item[0].text" />
                    <a :href="props.item[0].link" class="readmore">{{ props.item[0].tombol }}</a>
                  </CardGrad>
                </div>
                <div class="col-md-8 mb-4" v-if="props.item[1]">
                  <CardGrad :lg="'right-left'" class="fitur">
                    <div class="row">
                      <div class="col-md-6 pt-5 order-md-1 order-2">
                        <h4>{{ props.item[1].judul }}</h4>
                        <div class="fitur-text" v-html="props.item[1].text" />
                        <a :href="props.item[1].link" class="readmore">{{ props.item[1].tombol }}</a>
                      </div>
                      <div class="col-md-6 text-center order-md-2 order-1">
                        <img :src="formatImageSource(props.item[1].gambar)" class="img-fluid h-100" />
                      </div>
                    </div>
                  </CardGrad>
                </div>
              </div>
              <div class="row">
                <div class="col-md-8 mb-4" v-if="props.item[2]">
                  <CardGrad :lg="'right-left'" class="fitur">
                    <div class="row">
                      <div class="col-md-6 pt-5 order-md-1 order-2">
                        <h4>{{ props.item[2].judul }}</h4>
                        <div class="fitur-text" v-html="props.item[2].text" />
                        <a :href="props.item[2].link" class="readmore">{{ props.item[2].tombol }}</a>
                      </div>
                      <div class="col-md-6 text-center order-md-2 order-1">
                        <img :src="formatImageSource(props.item[2].gambar)" class="img-fluid h-100" />
                      </div>
                    </div>
                  </CardGrad>
                </div>
                <div class="col-md-4 mb-4" v-if="props.item[3]">
                  <CardGrad :lg="'top-bottom'" class="fitur">
                    <div class="text-center">
                      <img :src="formatImageSource(props.item[3].gambar)" class="mb-4 img-fluid" />
                    </div>
                    <h4>{{ props.item[3].judul }}</h4>
                    <div class="fitur-text" v-html="props.item[3].text" />
                    <a :href="props.item[3].link" class="readmore">{{ props.item[3].tombol }}</a>
                  </CardGrad>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-12 mb-4" v-if="props.item[4]">
              <CardGrad :lg="'top-bottom'" class="fitur">
                <div class="text-center">
                  <img
                    :src="formatImageSource(props.item[4].gambar)"
                    class="mb-3 pl-lg-3 pt-5 mt-2 img-fluid"
                  />
                </div>
                <h4>{{ props.item[4].judul }}</h4>
                <div class="fitur-text" v-html="props.item[4].text" />
                <a :href="props.item[4].link" class="readmore">{{ props.item[4].tombol }}</a>
              </CardGrad>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 mb-4" v-if="props.item[5]">
              <CardGrad :lg="'right-left'" class="fitur">
                <div class="row align-items-center">
                  <div class="col-md-6 pt-5 order-md-1 order-2">
                    <h4>{{ props.item[5].judul }}</h4>
                    <div class="fitur-text" v-html="props.item[5].text" />
                    <a :href="props.item[5].link" class="readmore">{{ props.item[5].tombol }}</a>
                  </div>
                  <div class="col-md-6 text-center order-md-2 order-1">
                    <img :src="formatImageSource(props.item[5].gambar)" class="img-fluid" style="height: 68%"/>
                  </div>
                </div>
              </CardGrad>
            </div>
            <div class="col-md-6 mb-4" v-if="props.item[6]">
              <CardGrad :lg="'top-bottom'" class="fitur">
                <div class="text-center">
                  <img :src="formatImageSource(props.item[6].gambar)" class="mb-4 img-fluid" />
                </div>
                <h4>{{ props.item[6].judul }}</h4>
                <div class="fitur-text" v-html="props.item[6].text" />
                <a :href="props.item[6].link" class="readmore">{{ props.item[6].tombol }}</a>
              </CardGrad>
            </div>
            <!-- <div class="col-md-6 mb-4">
              <CardGrad :lg="'left-right'" class="fitur">
                <div class="row">
                  <div class="col-md-6 text-center">
                    <img src="/fitur/fitur7.png" class="mt-3 img-fluid h-100" />
                  </div>
                  <div class="col-md-6 pt-5">
                    <h4>Tryout Asesmen Nasional</h4>
                    <p class="fitur-text pb-5">
                      Soal yang tersedia sesuai dengan desain pengembangan soal
                      AKM PUSMENJAR
                    </p>
                    <a href="" class="readmore">Selengkapnya</a>
                  </div>
                </div>
              </CardGrad>
            </div> -->
            <div class="col-md-6 mb-4" v-if="props.item[7]">
              <CardGrad :lg="'top-bottom'" class="fitur">
                <div class="text-center">
                  <img :src="formatImageSource(props.item[7].gambar)" class="pb-3 ml-2 img-fluid" />
                </div>
                <h4>{{ props.item[7].judul }}</h4>
                <div class="fitur-text" v-html="props.item[7].text" />
                <a :href="props.item[7].link" class="readmore">{{ props.item[7].tombol }}</a>
              </CardGrad>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionLayanan",
  props: ["props"],
  methods: {
    formatImageSource(endpoint) {
      return process.env.apiUrl + `/storage/${endpoint}`;
    },
  }
};
</script>
