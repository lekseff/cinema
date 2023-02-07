<template>
  <v-dialog
      v-model="modal"
      style="max-width: 90%"
  >
    <!--    <v-container>-->
    <v-card class="text-white bg-blue-grey-darken-4 rounded-lg">
      <!-- Шапка окна -->
      <v-card-text class="d-flex align-center justify-space-between pa-2">
        <span>Выбор мест</span>
        <v-icon
            size="30"
            class="text-white"
            icon="mdi-window-close"
            @click="onCloseModal"
        ></v-icon>
      </v-card-text>
      <v-divider></v-divider>
      <!-- Контент -->
      <v-row class="ma-0">
        <v-col cols="9" class="d-flex align-center justify-center">
          <div>
            <v-img src="/img/screen.png" width="100%" class="flex-grow-1 mb-10"></v-img>
            <div class="flex-grow-1 px-5">
              <!-- Места -->
              <div v-for="row in hall.rows" :key="row">
<!--                <div-->
<!--                    v-for="place in hall.places"-->
<!--                    :key="place"-->
<!--                    class="place bg-grey-lighten-2 my-1 mx-2 d-inline-block"-->
<!--                >-->
<!--                </div>-->
                <v-img
                    v-for="place in hall.places"
                    :key="place"
                    class="bg-grey-lighten-2 my-1 mx-2 d-inline-block"
                    width="24"
                    style="min-height: 100%"
                >

                </v-img>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="3">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid incidunt suscipit veniam?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid incidunt suscipit veniam?</p>
        </v-col>
      </v-row>
    </v-card>
    <!--    </v-container>-->
  </v-dialog>
</template>

<script>
export default {
  name: "ModalHall",
  data: () => ({
    modal: false,
    hall: {
      rows: 10,
      places: 15
    }
  }),
  methods: {
    onCloseModal() {
      this.modal = false
    }
  },
  mounted() {
    setTimeout(() => {
      this.modal = true
    }, 300)
  }
}
</script>

<style scoped>

.place {
  width: 24px;
  height: 24px;
  /*width: 100%;*/
  /*height: 100%;*/
}

</style>
