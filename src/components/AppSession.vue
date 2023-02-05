<template>
  <v-card>
    <v-tabs
        bg-color="white"
        show-arrows
        grow
        slider-color="deep-orange-lighten-1"
        height="70"
        v-model="selectedDay"
    >
      <v-tab
          v-for="i in 5"
          :key="i"
          :value="'tab-' + i"
      >
        <v-sheet class="mx-1 bg-transparent text-grey-darken-3">
          <p class="text-capitalize">Сегодня</p>
          <p>04.02.2023</p>
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
