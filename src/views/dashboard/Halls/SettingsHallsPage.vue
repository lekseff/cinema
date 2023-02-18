<template>
   <!-- Лоадер -->
   <AppLoader v-if="loading"/>
   <div v-else>
      <h3 class="text-center text-grey-darken-3 text-h4 py-2">
         Конфигурация залов
      </h3>
      <v-divider></v-divider>
      <!-- CСообщение пустой список -->
      <h6
          v-if="!activeHalls.length"
          class="text-center text-h5 text-grey-darken-1 mt-5"
      >
         Активных залов нет
      </h6>

      <!-- Контент -->
      <div v-else>
         <v-chip-group
             filter
             mandatory
             v-model="selectedHall"
             class="justify-center py-3"
             selected-class="selected-chip"
         >
            <v-chip
                v-for="hall in activeHalls"
                :key="hall.id"
                :value="hall.id"
                class="px-6"
                :to="{name: 'settingHall', params: {id: hall.id}}"
            >
               {{ hall.name }}
            </v-chip>
         </v-chip-group>
         <v-divider></v-divider>
         <router-view></router-view>
      </div>
   </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AppLoader from "@/components/AppLoader";

export default {
   name: "SettingsHallsPage",
   components: {AppLoader},
   data: () => ({
      loading: true,
      selectedHall: '',
   }),
   mounted() {
      this.getHalls()
          .then(() => {
             this.setActiveHall()
          })
          .finally(() => {
             this.loading = false
          })
   },
   methods: {
      ...mapActions(['getHalls']),
      /**
       * Устанавливает активный зал при открытии страницы
       */
      setActiveHall() {
         if (!this.activeHalls.length) return
         this.selectedHall = this.activeHalls[0].id
         // Показываем страницу активного зала
         this.$router.push({name: 'settingHall', params: {id: this.selectedHall}})
      }
   },
   computed: {
      ...mapGetters({
         halls: 'getAllHalls',
         activeHalls: 'getActiveHalls',
      })
   },
}
</script>

<style scoped>
.selected-chip {
   background-color: #FF7043;
   color: white;
   box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
}
</style>
