<template>
  <v-divider></v-divider>
  <v-container>
    <v-footer class="d-flex flex-column flex-grow-1 bg-transparent pa-0">
      <v-row
          no-gutters
          class="align-center ma-0 px-2"
          style="width: 100%"
      >
        <!-- Логотип -->
        <v-col cols="12" md="4" class="pa-0 text-center text-md-start">
          <AppLogo/>
        </v-col>
        <!-- Соц иконки -->
        <v-col cols="12" md="4" class="pa-0 text-center">
          <v-btn
              v-for="icon in icons"
              :key="icon"
              :icon="icon"
              variant="text"
              class="pa-1 app-link-hover"
          >
          </v-btn>
        </v-col>
        <!-- Телефон -->
        <v-col cols="12" md="4" class="pa-0">
          <a
              class="d-flex align-center justify-center justify-md-end text-decoration-none text-white text-h5 app-link-hover"
              href="tel:+78001234567"
          >
            <v-icon
                icon="mdi-phone"
                size="18"
                class="mr-2"
            >
            </v-icon>
            8(800)-123-45-67
          </a>
        </v-col>
      </v-row>
      <span class="font-weight-thin mt-2">
        FS-40 | Дипломная работа "Кинотеатр"
      </span>
      <span>
        &copy; 2021-2023
      </span>
    </v-footer>
  </v-container>
</template>

<script>
import AppLogo from "@/components/AppLogo";

export default {
  name: "AppFooter",
  components: {AppLogo},
  data: () => ({
    icons: [
      'mdi-youtube',
      'mdi-odnoklassniki',
      'mdi-instagram'
    ]
  }),
}
</script>

<style scoped>

</style>
