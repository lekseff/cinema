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
             prepend-icon="mdi-account-circle"
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

            <v-list-item
                value="1"
                title="Управление"
                :to="{name: 'controlHalls'}"
            >
               <template v-slot:prepend>
                  <v-icon class="ma-0 mr-3" color="white" size="small">mdi-tune</v-icon>
               </template>
            </v-list-item>

            <v-list-item
                value="2"
                title="Конфигурация"
                :to="{name: 'settingsHalls'}"
            >
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

            <v-list-item
                value="22"
                title="Добавить фильм"
            >
               <template v-slot:prepend>
                  <v-icon class="ma-0 mr-1" color="white">mdi-plus-thick</v-icon>
               </template>
            </v-list-item>

         </v-list-group>
      </v-list>
      <!-- Кнопка выход -->
      <template v-slot:append>
         <div class="pa-2">
            <v-btn block>
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
import SnackBar from "@/components/SnackBar";

export default {
   name: "DashboardLayout",
   components: {SnackBar}
}
</script>

<style scoped>

</style>
