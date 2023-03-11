<template>
   <v-navigation-drawer
       width="290"
       class="bg-blue-grey-darken-3"
       permanent
       app
   >
      <v-list>
         <v-list-item
             title="Админка"
             prepend-icon="mdi-view-dashboard"
         ></v-list-item>
         <v-divider></v-divider>

         <!-- Группа залы -->
         <v-list-group value="halls">
            <template v-slot:activator="{ props }">
               <v-list-item
                   v-bind="props"
                   prepend-icon="mdi-sofa-single-outline"
                   title="Залы"
               ></v-list-item>
            </template>

            <v-list-item title="Управление" :to="{name: 'controlHalls'}">
               <template v-slot:prepend>
                  <v-icon class="ma-0 mr-3" color="white" size="small">mdi-tune</v-icon>
               </template>
            </v-list-item>

            <v-list-item title="Конфигурация" :to="{name: 'settingsHalls'}">
               <template v-slot:prepend>
                  <v-icon class="ma-0 mr-3" color="white" size="small">mdi-cogs</v-icon>
               </template>
            </v-list-item>
         </v-list-group>

         <!--  Группа фильмы -->
         <v-list-group value="movies">
            <template v-slot:activator="{ props }">
               <v-list-item
                   v-bind="props"
                   prepend-icon="mdi-movie-roll"
                   title="Фильмы"
               ></v-list-item>
            </template>

            <v-list-item title="Все фильмы" :to="{name: 'allMovies'}">
               <template v-slot:prepend>
                  <v-icon class="ma-0 mr-3" color="white" size="small">mdi-movie-roll</v-icon>
               </template>
            </v-list-item>

            <v-list-item title="Добавить фильм" :to="{name: 'createMovie'}">
               <template v-slot:prepend>
                  <v-icon class="ma-0 mr-3" color="white" size="small">mdi-plus-thick</v-icon>
               </template>
            </v-list-item>

         </v-list-group>

         <!-- Группа сеансы -->
         <v-list-group value="sessions" :opened="true">
            <template v-slot:activator="{ props }">
               <v-list-item
                   v-bind="props"
                   prepend-icon="mdi-filmstrip"
                   title="Сеансы"
               ></v-list-item>
            </template>

            <v-list-item title="Все сеансы" :to="{name: 'allSessions'}">
               <template v-slot:prepend>
                  <v-icon class="ma-0 mr-3" color="white" size="small">mdi-movie-play-outline</v-icon>
               </template>
            </v-list-item>

            <v-list-item title="Добавить сеанс" :to="{name: 'createSessions'}">
               <template v-slot:prepend>
                  <v-icon class="ma-0 mr-3" color="white" size="small">mdi-plus-thick</v-icon>
               </template>
            </v-list-item>
         </v-list-group>

         <v-list-group value="slider" :opened="true">
            <template v-slot:activator="{ props }">
               <v-list-item
                   v-bind="props"
                   prepend-icon="mdi-filmstrip"
                   title="Слайдер"
               ></v-list-item>
            </template>

            <v-list-item title="Управление" :to="{name: 'controlSlider'}">
               <template v-slot:prepend>
                  <v-icon class="ma-0 mr-3" color="white" size="small">mdi-movie-play-outline</v-icon>
               </template>
            </v-list-item>

            <v-list-item title="Добавить" :to="{name: 'createSlider'}">
               <template v-slot:prepend>
                  <v-icon class="ma-0 mr-3" color="white" size="small">mdi-plus-thick</v-icon>
               </template>
            </v-list-item>
         </v-list-group>
      </v-list>
      <!-- Кнопка выход -->
      <template v-slot:append>
         <div class="pa-2">
            <v-btn
                block
                :to="{name: 'home'}"
                prepend-icon="mdi-home-account"
            >
               На главную
            </v-btn>
         </div>
         <div class="pa-2">
            <v-btn
                block
                @click.prevent="onLogout"
                prepend-icon="mdi-logout-variant"
            >
               Выход
            </v-btn>
         </div>
      </template>
   </v-navigation-drawer>
   <v-main class="bg-blue-lighten-5">
      <router-view></router-view>
   </v-main>
   <!-- Уведомления -->
   <SnackBar/>
</template>

<script>
import {mapActions} from 'vuex'
import SnackBar from "@/components/SnackBar";

export default {
   name: "DashboardLayout",
   components: {SnackBar},
   methods: {
      ...mapActions(['logout']),
      async onLogout() {
         await this.logout()
         this.$router.push({name: 'home'})
      }
   }
}
</script>

<style scoped>

</style>
