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
        v-model="selectedDay"
    >
      <v-tab
          v-for="i in 7"
          :key="i"
          :value="'tab-' + i"
      >
        <v-sheet class="bg-transparent text-grey-darken-3 text-body-1">
          <p>Сегодня</p>
          <p class="text-body-2">05 февраля</p>
        </v-sheet>
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  name: "AppSession",
  data: () => ({
    selectedDay: null
  }),
  methods: {
  }
}
</script>

<style scoped>
.v-tab--selected {
  background: rgba(255, 112, 67, 0.15);
}

</style>
