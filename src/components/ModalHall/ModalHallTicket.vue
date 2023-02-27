<template>
   <v-card class="text-white bg-blue-grey-darken-4 rounded-lg pa-4">

      <!-- Заголовок карточки -->
      <div class="d-flex align-center justify-space-between pb-3">
         <v-card-title class="py-0">Электронный билет</v-card-title>
         <!-- Кнопка закрыть -->
         <v-btn variant="text" @click="onCloseModal">
            <v-icon size="28">mdi-close</v-icon>
         </v-btn>
      </div>
      <v-divider></v-divider>

      <!-- Список билетов -->
      <div class="pa-3">
         <div
             v-for="place in places"
             :key="place.id"
             class="rounded-lg mb-2 pa-3"
             style="border: 1px solid gray"
         >
            <v-icon class="mr-2">mdi-ticket-account</v-icon>
            {{ place.isVip ? 'Vip место' : 'Стандарт' }}
            | Ряд: {{ place.row }}
            | Место: {{ place.id }}
            | Стоимость: {{ place.price }} ₽
         </div>
      </div>

      <!-- Loader -->
      <AppLoader v-if="loading" style="min-height: 160px"/>

      <!-- QR код -->
      <div v-else class="mb-3">
         <div v-if="qrCode" class="text-center" v-html="qrCode"></div>
         <p v-else>Ошибка загрузки QR-кода</p>
      </div>

      <!-- Информация -->
      <v-divider></v-divider>
      <div class="text-center text-body-2 mt-2">
         <span class="d-block">Покажите QR-код нашему контроллеру для подтверждения бронирования.</span>
         <span class="d-block">Приятного просмотра!</span>
      </div>
   </v-card>
</template>

<script>
import {mapActions} from 'vuex'
import AppLoader from "@/components/AppLoader";

export default {
   name: 'ModalHallTicket',
   emits: ['close-modal'],
   components: {AppLoader},
   props: {
      sessionId: Number,
      places: Object
   },
   data: () => ({
      loading: true,
      qrCode: null
   }),
   mounted() {
      /**
       * Отправка данных и получение qr кода
       */
      this.confirmOrder(this.order)
          .then((response) => {
             if (response.data) {
                this.qrCode = response.data
             }
          })
          .finally(() => {
             this.loading = false
          })
   },
   computed: {
      /**
       * Формирует массив id выбранных мест
       * @returns {*}
       */
      placesId() {
         return this.places.map(p => p.id)
      },
      /**
       * Формирует данные для отправки на сервер
       * @returns {{places: *, id: number}}
       */
      order() {
         return {
            id: this.sessionId,
            places: this.placesId
         }
      }
   },
   methods: {
      ...mapActions(['confirmOrder']),
      onCloseModal() {
         this.$emit('close-modal')
      }
   }
}
</script>

<style scoped>

</style>
