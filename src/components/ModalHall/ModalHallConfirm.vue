<template>
   <v-card
       :min-width="cardWidth"
       class="text-white bg-blue-grey-darken-4 rounded-lg pa-4"
   >
      <div class="d-flex align-center justify-space-between pb-3">
         <v-card-title class="py-0">Ваши билеты | {{ hall }}</v-card-title>
         <v-btn
             variant="text"
             @click="onPervStep"
         >
            <v-icon size="38">mdi-chevron-left</v-icon>
         </v-btn>
      </div>
      <v-divider></v-divider>

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
         <p class="mt-4">Количество билетов: {{ places.length }}</p>
         <p class="mt-1">Стоимость: {{ totalPrice }} ₽</p>
      </div>
      <v-card-actions class="pa-5 justify-center">
         <v-btn
             variant="flat"
             color="deep-orange-lighten-1"
             @click="onNextStep"
         >
            Получить код бронирования
         </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <p class="text-body-2 font-weight-regular text-center pa-3">
         <span class="d-block">
            После оплаты билет будет доступен в этом окне, а также придёт вам на почту.
         </span>
         <span class="d-block">
            Покажите QR-код нашему контролёру у входа в зал. Приятного просмотра!
         </span>
      </p>
   </v-card>
</template>

<script>
export default {
   name: 'ModalHallConfirm',
   emits: ['next-step', 'prev-step'],
   props: {
      places: Array,
      hall: String,
      totalPrice: Number
   },
   computed: {
      cardWidth() {
         return this.$vuetify.display.xs ? 'auto' : '600'
      }
   },
   methods: {
      /**
       * Следующий шаг оформления
       */
      onNextStep() {
         this.$emit('next-step')
      },
      /**
       * Предыдущий шаг оформления
       */
      onPervStep() {
         this.$emit('prev-step')
      }
   }
}
</script>

<style scoped>

</style>
