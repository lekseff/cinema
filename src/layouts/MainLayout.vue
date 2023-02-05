<template>
  <main class="bg-blue-grey-darken-4 flex-grow-1">
    <TheHeader/>
    <router-view></router-view>
  </main>
</template>

<script>
import TheHeader from "@/components/TheHeader";

export default {
  name: "MainLayout",
  components: {TheHeader},
}
</script>

<style scoped>
/*.main-background {*/
/*  height: 100vh;*/
/*  background-image: url('/src/assets/background.jpg');*/
/*  background-position: center center;*/
/*  background-size: cover;*/
/*}*/
</style>
