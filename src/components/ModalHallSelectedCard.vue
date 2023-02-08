<template>
 <v-card class="d-flex align-center justify-space-between bg-transparent" flat>
      <v-card-text class="pa-2 text-body-2">
         <span class="d-block">Стандарт</span>
         <span class="d-block">Место: 1 | Ряд: 12</span>
         <span>140 ₽</span>
      </v-card-text>
    <v-card-actions class="pa-0">
      <v-btn
          color="red-lighten-1" variant="text"
          icon="mdi-delete-circle-outline"
          @click="onRemove"
      />
    </v-card-actions>
 </v-card>
   <v-divider></v-divider>
</template>

<script>
export default {
   name: "ModalHallSelectedCard",
   methods: {
      /**
       * Удаление выбранного места
       */
      onRemove() {
         console.log('remove card')
      }
   }
}
</script>

<style scoped>

</style>
