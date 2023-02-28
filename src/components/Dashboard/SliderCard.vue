<template>
  <v-card class="text-grey-darken-3 rounded-lg" elevation="4">
     <v-img
         :src="slide.photo"
         aspect-ratio="2.17"
         cover
     ></v-img>
     <v-card-title>{{ slide.name }}</v-card-title>
     <v-divider></v-divider>
     <v-card-actions class="justify-center">
        <v-btn
            block
            color="error"
            variant="text"
            @click="onRemoveSlide(slide.id)"
        >
           Удалить
        </v-btn>
     </v-card-actions>
  </v-card>
</template>

<script>
export default {
   name: 'SliderCard',
   emits: ['remove-slide'],
   props: {
      slide: Object
   },
   methods: {
      /**
       * Удаление слайда
       * @param id
       */
      onRemoveSlide(id) {
         this.$emit('remove-slide', id)
      }
   }
}
</script>

<style scoped>

</style>
