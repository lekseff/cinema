<template>
  <v-container class="fill-height flex-column text-white">
    <h1 class="text-center text-h4 align-center mb-4">
      Контакты
    </h1>
    <p class="mb-2">
      Наш кинотеатр расположен в г.Тамбов, по адресу: Восточное шоссе, д. 17, торговый центр Plaza.
    </p>
    <!-- Яндекс карта -->
    <iframe
        class="rounded-lg mb-3"
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A205cfa12669ef546216faae4eab3ba6d99439f48e5d79016b858c8eea03b43c3&amp;source=constructor"
        width="100%" height="400" frameborder="0">
    </iframe>
    <!-- Блок лоя связи -->
    <div class="mt-1 mb-3" style="width: 100%">
      <h4 class="text-h5 mt-4 mb-2 text-center">Координаты для связи:</h4>
      <div class="text-center">
        <p class="my-2">
          <span class="text-body-2 text-decoration-underline">Телефон:</span>
          <a class="text-decoration-none text-white app-link-hover" href="tel:+78001234567"> 8(800)-123-45-67</a>
        </p>
        <p class="my-2">
          <span class="text-body-2 text-decoration-underline">Email:</span>
          <a class="text-decoration-none text-white app-link-hover" href="mailto:idemvkino@mail.ru"> idemvkino@mail.ru</a>
        </p>
        <p class="mb-2">
          <span class="text-body-2 text-decoration-underline">Время работы:</span>
          8:00 - 23:00 (Ежедневно)
        </p>
      </div>
    </div>
    <!-- Кнопка на главную -->
    <router-link
        :to="{name: 'home'}"
        class="text-decoration-none"
    >
      <v-btn
          flat
          class="bg-deep-orange-lighten-1"
      >
        На главную
      </v-btn>
    </router-link>
  </v-container>
  <AppFooter/>
</template>

<script>
import AppFooter from "@/components/AppFooter";

export default {
  name: "ContactsPage",
  components: {AppFooter}
}
</script>

<style scoped>

</style>
