<template>
   <h2 class="text-h4 my-5">
      Расписание сеансов
   </h2>
   <v-card rounded="lg">
      <v-tabs
          bg-color="white"
          show-arrows
          grow
          slider-color="deep-orange-lighten-1"
          height="70"
          v-model="selectedDate"
      >
         <v-tab
             v-for="item in dates"
             :key="item.id"
             :value="item.date"
         >
            <v-sheet class="bg-transparent text-grey-darken-3 text-body-1">
               <p>{{ item.day }}</p>
               <p class="text-body-2"> {{ item.name }}</p>
            </v-sheet>
         </v-tab>
      </v-tabs>
   </v-card>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
   name: "AppSession",
   data: () => ({}),
   methods: {
      ...mapActions(['setSelectedDate'])
   },
   computed: {
      ...mapGetters({
         dates: 'getDates',
         selected: 'getSelectedDate'
      }),
      selectedDate: {
         get() {
            return this.selected
         },
         set(value) {
            this.setSelectedDate(value)
         }
      }
   },
}
</script>

<style scoped>
.v-tab--selected {
   background: rgba(255, 112, 67, 0.15);
}

</style>
