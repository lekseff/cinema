<template>
   <v-card class="d-flex align-center justify-space-between bg-transparent" flat>
      <v-card-text class="pa-2 text-body-2">
         <span class="d-block">
            {{ placeType }}
         </span>
         <span class="d-block">
            {{ info }}
         </span>
         <span>
            {{ session.price }} ₽
         </span>
      </v-card-text>
      <v-card-actions class="pa-0">
         <v-btn
             color="red-lighten-1" variant="text"
             icon="mdi-delete-circle-outline"
             @click="onRemove(session.id)"
         />
      </v-card-actions>
   </v-card>
   <v-divider></v-divider>
</template>

<script>
export default {
   name: 'ModalHallSelectedCard',
   emits: ['removePlace'],
   props: {
      session: Object
   },
   computed: {
      info() {
         const {id, row} = this.session
         return `Место: ${id} | Ряд: ${row}`
      },
      placeType() {
         return this.session.isVip ? 'Vip место' : 'Стандарт'
      }
   },
   methods: {
      /**
       * Удаление выбранного места
       */
      onRemove(id) {
         this.$emit('removePlace', id)
      }
   }
}
</script>

<style scoped>

</style>
