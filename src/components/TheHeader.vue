<template>
   <v-container class="ma-0 pa-0" fluid>
      <v-container>
         <!-- Меню на десктопе -->
         <div v-if="$vuetify.display.mdAndUp" class="d-flex align-center justify-space-between">
            <AppLogo/>
            <div class="d-flex align-center flex-grow-1 justify-space-between">
               <!-- Пункты меню -->
               <nav class="d-block flex-grow-1 px-2">
                  <ul class="d-flex justify-space-evenly text-uppercase nav-list">
                     <li
                         v-for="item of menuItems"
                         :key="item.name"
                         class="font-weight-medium "
                     >
                        <router-link :to="{name: item.routeName}"
                                     class="text-decoration-none text-white app-link-hover">
                           {{ item.title }}
                        </router-link>
                     </li>
                  </ul>
               </nav>
               <!-- Телефон -->
               <a href="tel:+78001234567" class="text-decoration-none text-white text-h5 app-link-hover">
                  8(800)-123-45-67
               </a>
            </div>
         </div>
         <!-- Мобильное меню и бургер-->
         <div v-else class="d-flex align-center justify-space-between">
            <!-- TODO: Подумать над вынесением кнопки в компонент -->
            <!-- кнопка бургера -->
            <v-btn
                variant="text"
                class="px-0"
                @click.stop="onCloseDrawer"
            >
               <v-icon class="pa-0" size="36">mdi-menu</v-icon>
            </v-btn>
            <AppLogo/>
            <!-- Кнопка назад -->
            <v-btn
                v-if="isHomePage"
                variant="text"
                class="px-0"
                @click.stop="onBack"
            >
               <v-icon class="pa-0" size="36">mdi-arrow-left</v-icon>
            </v-btn>
            <v-navigation-drawer
                v-model="drawer"
                location="top"
                color="white"
                rounded="lg"
                style="height: fit-content"
            >
               <v-list class="pt-0">
                  <v-list-item class="flex-grow-1 text-grey-darken-3 bg-blue-grey-darken-4 py-3">
                     <div class="d-flex align-center justify-space-between flex-grow-1">
                        <AppLogo/>
                        <v-icon size="30" class="text-white" @click="onCloseDrawer">mdi-window-close</v-icon>
                     </div>
                  </v-list-item>
                  <v-divider class="mb-3"></v-divider>
                  <router-link
                      v-for="item in menuItems"
                      :key="item.name"
                      :to="{name: item.routeName}"
                      value="12"
                      class="text-decoration-none text-grey-darken-3"
                  >
                     <v-list-item class="py-5">
                        <template v-slot:prepend>
                           <v-icon :icon="item.icon" class="mr-4"></v-icon>
                        </template>
                        <v-list-item-title class="text-h5"> {{ item.title }}</v-list-item-title>
                     </v-list-item>
                  </router-link>
               </v-list>
            </v-navigation-drawer>
         </div>
      </v-container>
   </v-container>
</template>

<script>
import AppLogo from '@/components/AppLogo'

export default {
   name: 'TheHeader',
   components: {AppLogo},
   data: () => ({
      drawer: false,
      menuItems: [
         {
            routeName: 'home',
            icon: 'mdi-list-box-outline',
            title: 'Расписание'
         },
         // {
         //    routeName: 'today',
         //    icon: 'mdi-movie-open-outline',
         //    title: 'Сегодня в кино',
         // },
         {
            routeName: 'login',
            icon: 'mdi-movie-open-outline',
            title: 'Вход',
         },
         {
            routeName: 'contacts',
            icon: 'mdi-contacts',
            title: 'Контакты'
         }
      ]
   }),
   methods: {
      /**
       * Управление мобильным меню
       */
      onCloseDrawer() {
         this.drawer = !this.drawer
      },
      /**
       * Возврат на предыдущую страницу
       */
      onBack() {
         history.back()
      }
   },
   computed: {
      /**
       * Проверка на домашнюю страницу
       * @returns {boolean}
       */
      isHomePage() {
         if (this.$route['name']) {
            return this.$route['name'] !== 'home'
         }
         return false
      }
   }
}
</script>

<style scoped>
.router-link-active {
   color: #FF7043 !important;
   border-bottom: 2px solid #FF7043;
}
</style>
