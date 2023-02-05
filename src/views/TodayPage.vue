<template>
  <v-container>
    <h1>Today</h1>
    <h5>В кино сегодня</h5>
    <router-link :to="{name: 'home'}">На главную</router-link>
  </v-container>
</template>

<script>
export default {
  name: "TodayPage"
}
</script>

<style scoped>

</style>
