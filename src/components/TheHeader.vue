<template>
  <v-container class="ma-0 pa-0" fluid>
    <v-container>
      <div class="d-flex align-center justify-space-between">
        <AppLogo/>
        <nav v-if="$vuetify.display.mdAndUp" class="d-block flex-grow-1">
          <ul class="d-flex justify-space-evenly text-uppercase nav-list">
            <li
                v-for="item of menuItems"
                :key="item.name"
                class="font-weight-medium "
            >
              <router-link :to="{name: item.name}" class="text-decoration-none nav-link">
                {{ item.title }}
              </router-link>
            </li>

          </ul>
        </nav>
        <div>
          <a
              class="text-decoration-none text-white text-h6"
              href="tel:+78001234567">8(800)-123-45-67
          </a>
        </div>
        <!--      <div>-->
        <!--        <router-link to="/login">Вход</router-link>-->
        <!--      </div>-->

      </div>
    </v-container>
  </v-container>
</template>

<script>
import AppLogo from "@/components/AppLogo";

export default {
  name: "TheHeader",
  components: {AppLogo},
  data: () => ({
    menuItems: [
      {
        name: 'home',
        title: 'Расписание'
      },
      {
        name: 'today',
        title: 'Сегодня в кино',
      },
      {
        name: 'contacts',
        title: 'Контакты'
      }
    ]
  })
}
</script>

<style scoped>
.nav-list {
  list-style: none;
}
.nav-link {
  color: black;
  transition: all 0.3s ease-in-out;
}

.nav-link:hover {
  color: #FF7043!important;
  transition: all 0.2s ease-in-out;
}

.nav-link:visited {
  color: inherit;
}

.router-link-active {
  color: #FF7043!important;
}
</style>
