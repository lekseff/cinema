<template>
   <v-container>
      <AppLoader v-if="loading"/>
      <!--      <v-sheet>-->
      <v-row v-else class="justify-space-around pt-3">
         <!-- Блок с размерами зала -->
         <v-col cols="5" class="border rounded-lg bg-white">
            <p class="text-grey-darken-3 mb-4">
               Укажите количество рядов и кресел в ряду:
            </p>
            <v-form>
               <!-- :TODO Попробовать вынести форму или инпуты в отдельный компонент -->
               <v-row class="justify-space-around">
                  <v-col cols="5">
                     <v-text-field
                         label="Рядов, шт"
                         type="number"
                         min="1"
                         variant="outlined"
                         density="comfortable"
                         :model-value="hall.rows"
                         oninput="validity.valid||(value='')"
                         :rules="[rules.required, rules.maxValue50]"
                     >
                     </v-text-field>
                  </v-col>
                  <v-col cols="5">
                     <v-text-field
                         type="number"
                         min="1"
                         label="Мест, шт"
                         variant="outlined"
                         density="comfortable"
                         :model-value="hall.places"
                         oninput="validity.valid||(value='')"
                         :rules="[rules.required, rules.maxValue50]"
                     >
                     </v-text-field>
                  </v-col>
               </v-row>
            </v-form>
         </v-col>
         <!-- Блок со стоимостью -->
         <v-col cols="5" class="border rounded-lg  bg-white">
            <p class="text-grey-darken-3 mb-4">
               Установите цены для типов кресел:
            </p>
            <v-form>
               <v-row class="justify-space-around">
                  <v-col cols="5">
                     <v-text-field
                         label="Обычное"
                         type="number"
                         min="1"
                         prefix="₽"
                         variant="outlined"
                         density="comfortable"
                         :model-value="hall.price"
                         oninput="validity.valid||(value='')"
                         :rules="[rules.required, rules.negative, rules.maxValue10000]"
                     >
                     </v-text-field>
                  </v-col>
                  <v-col cols="5">
                     <v-text-field
                         type="number"
                         :min="1"
                         prefix="₽"
                         label="VIP место"
                         variant="outlined"
                         density="comfortable"
                         :model-value="hall.priceVip"
                         oninput="validity.valid||(value='')"
                         :rules="[rules.required, rules.negative, rules.maxValue10000]"
                     >
                     </v-text-field>
                  </v-col>
               </v-row>
            </v-form>
         </v-col>
      </v-row>
      <!--      </v-sheet>-->
   </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AppLoader from "@/components/AppLoader";
import {rules} from '@/../constants'

export default {
   name: "SettingHallPage",
   components: {AppLoader},
   data: () => ({
      rules: rules,
      loading: true
   }),
   mounted() {
      this.getHallById(this.id)
          .finally(() => {
             this.loading = false
          })
   },
   methods: {
      ...mapActions(['getHallById'])
   },
   computed: {
      ...mapGetters({
         hall: 'getHall'
      }),
      id() {
         return this.$route.params.id
      }
   },
   watch: {
      id: function () {
         if (!this.id) return
         this.loading = true
         this.getHallById(this.id)
             .finally(() => {
                this.loading = false
             })
      }
   }
}
</script>

<style scoped>

</style>
