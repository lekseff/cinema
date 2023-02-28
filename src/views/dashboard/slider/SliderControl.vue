<template>
   <!-- Content -->
   <v-container>
      <h3 class="text-center text-grey-darken-3 text-h4 py-2 mb-2">Элементы слайдера</h3>
      <v-divider class="mb-8"></v-divider>
      <!-- Loader -->
      <AppLoader v-if="loading"/>
      <!-- Content -->
      <div v-else>
         <v-row v-if="slides.length">
            <v-col cols="12" md="6" lg="4" v-for="slide in slides" :key="slide.id">
               <SliderCard
                   :slide="slide"
                   @removeSlide="onRemoveSlide"
               />
            </v-col>
         </v-row>
         <h6 v-else class="text-center text-h5 text-grey-darken-1 mt-5">
            Нет элементов слайдера
         </h6>
      </div>
   </v-container>
</template>

<script>
import {mapActions} from 'vuex'
import AppLoader from '@/components/AppLoader'
import SliderCard from '@/components/Dashboard/SliderCard'

export default {
   name: 'SliderControl',
   components: {AppLoader, SliderCard},
   data: () => ({
      loading: true,
      slides: []
   }),
   mounted() {
      /**
       * Загружает все элементы слайдера
       */
      this.loadSlider()
          .then(response => {
             if (response && response.status === 200) {
                this.slides = response.data.data
             }
          })
          .finally(() => {
             this.loading = false
          })
   },
   methods: {
      ...mapActions(['loadSlider', 'removeSlide']),
      /**
       * Удаляет слайд
       * @param id
       */
      onRemoveSlide(id) {
         this.removeSlide(id)
             .then(response => {
                if (response && response.status === 200) {
                   this.slides = this.slides.filter(s => s.id !== id)
                }
             })
      }
   }
}
</script>

<style scoped>

</style>
